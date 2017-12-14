// Load env variables from .env file.
require('dotenv').config()

const Slack = require('slack')
const token = process.env.SLACK_OAUTH_TOKEN
const bot = new Slack({ token })
const purge_message = require('../../../config/purge_message')
const path = require('path')
const winston = require('winston')

const knex = require('knex')({
  dialect: 'sqlite3',
  connection: {
    filename: path.join(process.cwd(), `db/${process.env.NODE_ENV || 'dev'}.sqlite3`),
  },
})

module.exports = async (req, res, next) => {
  const channel = req.payload.channel
  const user = req.payload.user

  // Find the records for this channel_id.
  const records = await knex.select('*').from('purge_queue')
    .where('channel_id', '=', channel.id).catch(err => err)

  // Delete the records.
  const deletions = await knex.delete().from('purge_queue')
    .whereIn('channel_id', records.map(record => record.channel_id))
    .catch(err => err)

  // If records or deletions has a message, it’s an error.
  if (records.message || deletions.message) {
    winston.error(records, deletions)
    return res.sendStatus(500)
  }

  res.send({
    channel: channel.id,
    text: purge_message(channel.id),
    attachments: [{
      color: '#E0644F',
      text: `:ok_hand: <@${user.id}> saved the day!\n\nI’ve removed <#${channel.id}> from the queue.`,
    }],
  })

  records.forEach(record => {
    bot.pins.remove({
      token,
      channel: record.channel_id,
      timestamp: record.message_ts,
    }).catch(err => winston.error(err))
  })
}
