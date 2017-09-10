/**
 * Produce a welcome message for a new member.
 *
 * @param {string} name The name to use in the template.
 * @returns {string} message The welcome message.
 */
module.exports = name => {
  let message = `Hello, ${name}. Thanks for joining devanooga!\n\n`
  message += 'We started this group to give Chattanooga-area tinkerers a place to learn, develop their careers, and socialize with like minded people.\n\n'
  message += 'We have several channels that you can join that cover a range of topics. Here\'s a few that you might be interested in at first:\n'
  message += '- #truebegginers: We are all a beginner at something. Come learn something new!\n'
  message += '- #opportunities: Local (and remote) jobs and contracts.\n'
  message += '- #hacknight: Learn about our fortnightly hacknights. Join us!\n\n'
  message += 'If you have any questions, please ask for help in #general. We are (mostly) a friendly group, and would love to help you get started.\n\n'
  message += 'Thanks again!'

  return message
}
