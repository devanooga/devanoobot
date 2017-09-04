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
  let message = `Hello, ${event.user.profile.first_name || event.user.name}. Thanks for joining devanooga!\n\n`
      message += `We started this group to give Chattanooga-area tinkerers a place to learn, develop their careers, and socialize with like minded people.\n\n`
      message += `We have several channels that you can join that cover a range of topics. Here\'s a few that you might be interested in at first:\n`
      message += `- #truebegginers: We are all a beginner at something. Come learn something new!\n`
      message += `- #opportunities: Local (and remote) jobs and contracts.\n`
      message += `- #hacknight: Learn about our fortnightly hacknights. Join us!\n\n`
      message += `If you have any questions, please ask for help in #general. We are (mostly) a friendly group, and would love to help you get started.\n\n`
      message += `Thanks again!`

  return {
    text: message,
    channel: event.user.name,
  }
};
