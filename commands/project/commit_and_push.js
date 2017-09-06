/**
 * Commit changes, push to origin & submit a pull request.
 *
 * @param {object} data - The data necessary to perform git tasks.
 * @param {string} data.msg - The message to be used in the commit.
 * @param {string} data.branch - The name of the current branch.
 *
 * @returns {string} Reference to the submitted pull request.
 *
 * @throws Will throw an error if any of the git tasks fail.
 */
module.exports = data => {
// git add .
// git commit -m '$data.msg'
// git push
// Submit pull request against master.
// Return pull request reference (url, #, whatever).
}
