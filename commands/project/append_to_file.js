const {promisify} = require('util')
const fs = require('fs')
const appendFile = promisify(fs.appendFile)
/* Append a file with new line of text.
 *
 * @param {object} data - An object containing the following strings:
 * @param {string} data.filepath - The path to the file that must be amended.
 * @param {string} data.text - The string to append to the end of the file.
 *
 * @returns A promise that resolves after text has been appended to the file.
 */
module.exports = data => {
  return appendFile(data.filepath, data.text, 'utf-8')
}
