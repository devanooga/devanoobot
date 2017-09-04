/**
 * team_join event
 *
 *   See https://api.slack.com/events-api for more details.
 *
 * @param {object} event The event object provided by Slack API.
 * @returns {object} The response object sent to Slack API in a response.
 */
module.exports = event => {
  // Use the user’s first name, if available, and their handle as a fallback.
  const welcome_message = require('../../config/welcome_message')(
    event.user.profile.first_name || event.user.name)

  return {
    text: welcome_message,
    channel: event.user.name,
  }
};
