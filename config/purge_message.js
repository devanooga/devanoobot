/**
 * Produce a message for use when announcing a channel purge.
 *
 * @returns {string} message The welcome message.
 */
module.exports = channel_id => {
  let message = `Hello. :wave:\n\nThe <#${channel_id}> channel has not seen any `
  message += 'activity in the past month, so I’ve scheduled it to be archived one '
  message += 'week from today. Feel free to discuss whether it’s worth keeping, '
  message += 'and if it is, press the *Don’t Archive* button below.\n\nOtherwise, '
  message += 'the channel will be archived automatically.'

  return message
}
