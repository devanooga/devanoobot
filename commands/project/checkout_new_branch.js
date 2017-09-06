/**
 * Prepare working directory with a new branch.
 *
 * @param {object} data - An object with the values necessary to perform git tasks.
 * @param {string} data.tmppath - The path to the temp directory to which the
 *   repo should be cloned.
 * @param {string} data.repourl - The URL of the repo to clone.
 * @param {string} data.username - The Slack username of the submitter.
 *
 * @returns {string} The name of the branch created for this submission.
 *
 * @throws Will throw an exception if any of the git tasks fail.
 */
module.exports = data => {
  // Check if $PWD/.tmp/devanooga-meta exists and clone if not.
  // cd into $PWD/.tmp/devanooga-meta
  // Switch to master branch.
  // Fetch latest master.
  // git checkout -b $data.branch
  // git push -u origin $data.branch
  // Return.
}
