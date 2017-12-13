// Load env variables from .env file.
require('dotenv').config()

var Slack = require('slack')
const token = process.env.SLACK_OAUTH_TOKEN
const bot = new Slack({ token })
const purge_message = require('../../../config/purge_message')

module.exports = (req, res, next) => {
  var channel = req.payload.channel
  var user = req.payload.user
  res.send({
    channel: 'C3Y7T0J6P',
    text: purge_message(channel.id),
    attachments: [{
      color: '#E0644F',
      text: `:ok_hand: <@${user.id}> saved the day!`,
    }],
  })

  // Find the record for this channel_id and delete it.
  // If success, unpin message.
  // if failure, restore message button.
}
