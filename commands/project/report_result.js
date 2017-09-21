var got = require('got')
/**
 * Post a message to Slack with a link to the pull request.
 *
 * @param {object} data - An object with the data necessary to post a message
 *   to Slack.
 * @param {string} data.response_url - The URL at which to send the result.
 * @param {object} data.response_body - The body to send in the request.
 *
 * @throws Will throw an error if the request to Slack fails.
 */
module.exports = data => {
  return got.post(data.response_url, {
    body: JSON.stringify(data.response_body),
  })
}
