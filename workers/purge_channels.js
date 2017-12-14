// Load env variables from .env file.
require('dotenv').config()

const path = require('path')
const moment = require('moment')
const winston = require('winston')
const CronJob = require('cron').CronJob
const Slack = require('slack')
const token = process.env.SLACK_OAUTH_TOKEN
const bot = new Slack({ token })
const purge_message = require('../config/purge_message')

const knex = require('knex')({
  dialect: 'sqlite3',
  connection: {
    filename: path.join(process.cwd(), `db/${process.env.NODE_ENV || 'dev'}.sqlite3`),
  },
})

// At 8am on Monday, purge channels still in the DB.
new CronJob({
  cronTime: '00 00 08 01 * *',
  onTick: purge_channels,
  start: true,
  timezone: 'America/New York',
})

// At 9am on Monday, notify inactive channels about archival queue.
new CronJob({
  cronTime: '00 00 09 01 * *',
  onTick: notify_channels,
  start: true,
  timezone: 'America/New York',
})

async function notify_channels () {
  const channels = await bot.channels.list({}).then(response => {
    return response.channels.filter(channel => !channel.is_archived)
  }).catch(err => err)

  // If channels has a message property, it’s an error. 😔
  if (channels.message) {
    winston.error(`Error retrieving channel list. ${channels.message}`)
    return
  }

  const unarchived_channels = await Promise.all(channels.map(channel => {
    return bot.channels.history({
      channel: channel.id,
      count: 1,
    }).then(results => {
      channel.last_message = results.messages[0]
      return channel
    }).catch(err => {
      winston.error(`Error retrieving latest message for channel ${channel.name}. ${err.message}`)
    })
  }))

  const candidates = unarchived_channels.filter(channel => {
    return channel && channel.last_message &&
      (moment.unix(channel.last_message.ts) <= moment().subtract(1, 'months'))
  })

  // If there are no candiates, then stop here.
  if (!candidates.length) {
    winston.info('No archive candidates found. 👌')
    return null
  }

  const notified_channels_records = await Promise.all(candidates.map(channel => {
    // Post message on channel and get message id back.
    return bot.chat.postMessage({
      token,
      channel: channel.id,
      text: purge_message(channel.id),
      attachments: [{
        fallback: 'Something’s wrong, and an interactive button could not be created. :sadpanda:',
        color: '#E0644F',
        callback_id: 'archive_channels',
        actions: [{
          name: 'archive',
          text: 'Don’t Archive',
          type: 'button',
          value: 'do_not_archive',
        },{
          name: 'archive',
          text: 'I hate robots',
          type: 'button',
          value: 'i_hate_robots',
        }],
      }],
    }).then(result => {
      return {
        channel_id: channel.id,
        message_ts: result.ts,
      }
    })
  }))

  await Promise.all(notified_channels_records.map(record => {
    // Pin message on channel.
    return bot.pins.add({
      token,
      channel: record.channel_id,
      timestamp: record.message_ts,
    }).then(() => {
      return knex.insert(record).into('purge_queue')
    }).catch(err => winston.error(err)) }))

}

async function purge_channels () {
  const records = await knex.select('*').from('purge_queue')
    .catch(err => winston.error(err))

  if (!records || !records.length) { return }

  records.forEach(record => {
    bot.channels.archive({
      token,
      channel: record.channel_id,
    }).then(() => {
      return knex.delete().from('purge_queue')
        .where('channel_id', '=', record.channel_id)
    }).catch(err => winston.error(err))
  })
}
