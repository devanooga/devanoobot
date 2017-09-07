var winston = require('winston')
var slack = require('slack')
var token = process.env.SLACK_TOKEN
/**
 * Post a message to Slack with a link to the pull request.
 *
 * @param {object} data - An object with the data necessary to post a message
 *   to Slack.
 * @param {string} data.slackmsg - Text to submit in Slack message.
 *
 * @throws Will throw an error if the request to Slack fails.
 */
module.exports = data => {
  await slack.chat.postMessage({
    token: token,
    channel: 'hacknight',
    text: data.slackmsg,
  }, (err, data) => {
    if (err) {
      return winston.error(err)
    }
    winston.log(data)
  })
}
