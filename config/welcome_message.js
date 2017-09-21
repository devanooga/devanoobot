const channels = require('./channels')
/**
 * Produce a welcome message for a new member.
 *
 * @param {string} name The name to use in the template.
 * @returns {string} message The welcome message.
 */
module.exports = name => {
  let message = `Hello, <@${name}>. Thanks for joining devanooga! I’m your friendly neighborhood bot.\n\n`
  message += 'We started this group to give Chattanooga-area tinkerers a place to learn, develop their careers, and socialize with like-minded people.\n\n'
  message += 'We have several channels covering a range of topics. Here are a few that you might be interested in to get started:\n'
  message += `- <#${channels.truebeginners}>: We are all a beginner at something. Come learn something new!\n`
  message += `- <#${channels.opportunities}>: Local (and remote) jobs and contracts.\n`
  message += `- <#${channels.hacknight}>: Learn about our fortnightly hacknights. Join us!\n\n`
  message += `If you have any questions, please ask for help in <#${channels.general}>. We are (mostly) a friendly group, and would love to help you get started.\n\n`
  message += 'Thanks again!'

  return message
}
