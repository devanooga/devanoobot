const lib = require('lib')({token: process.env.STDLIB_TOKEN});

/**
 * team_join event
 *
 *   See https://api.slack.com/events-api for more details.
 *
 * @param {string} user The user id of the user that invoked this event (name is usable as well)
 * @param {string} channel The channel id the event was executed in (name is usable as well)
 * @param {string} text The text contents of the event
 * @param {object} event The full Slack event object
 * @param {string} botToken The bot token for the Slack bot you have activated
 * @returns {object}
 */
module.exports = (user, channel, text = '', event = {}, botToken = null, callback) => {

    callback(null, {
        text: `Hello, ${user}!\n`
            + `Thanks for joining devanooga!\n`
            + `We started this group to give Chattanooga-area tinkerers a place to learn, develop their careers, and socialize with like minded people.\n`
            + `We have several channels that you can join that cover a range of topics. Here\'s a few that you might be interested in at first:\n\n`
            + `- #truebegginers -- We are all a beginner at something. Come learn\n`
            + `- #opportunities -- Local (and remote) jobs and contracts\n`
            + `- #hacknight -- Learn about our fortnightly hacknights. Join us!\n\n`
            + `If you have any questions, please ask for help in #general. We are (mostly) a friendly group, and would love to help you get started.\n\n`
            + `Thanks again!`
    });

};
