var fs = require('fs')
/* Append a file with new line of text.
 *
 * @param {object} data - An object containing the following strings:
 * @param {string} data.filepath - The path to the file that must be amended.
 * @param {string} data.text - The string to append to the end of the file.
 * @param {string} data.username - The Slack username of the submitter.
 * @param {string} [data.fullname] - The full name of the submitter.
 *
 * @throws Will throw an error if document can’t be opened or written to.
 */
module.exports = data => {
  await fs.appendFile(data.filepath, data.text, 'utf-8')
  return
}
