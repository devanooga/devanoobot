const got = require('got')
const winston = require('winston')
/**
 * team_join event
 *
 *   See https://api.slack.com/events-api for more details.
 *
 * @param {object} event The event object provided by Slack API.
 * @returns {object} The response object sent to Slack API in a response.
 */
module.exports = (req, res, next) => {
  // Respond immediately with 👌.
  res.sendStatus(200)

  const user_id = req.body.event.user

  // Construct a welcome message with the member’s handle.
  const welcome_message = require('../../config/welcome_message')(user_id)

  // Fetch channel ID for convo w/member.
  got.post('https://slack.com/api/conversations.open', {
    json: true,
    form: true,
    body: {
      token: process.env.SLACK_BOT_OAUTH_TOKEN,
      users: user_id,
    },
  }).then(response => {
    var channel_id
    try {
      channel_id = response.body.channel.id
    }
    catch (error) {
      throw new Error(`Couldn’t determine channel_id from:\n${JSON.stringify(response.body, null, 2)}`)
    }

    // Send a private message to the member.
    return got.post('https://slack.com/api/chat.postMessage', {
      form: true,
      body: {
        token: process.env.SLACK_BOT_OAUTH_TOKEN,
        channel: channel_id,
        text: welcome_message,
      },
    })
  }).catch(err => console.log(err))
}
