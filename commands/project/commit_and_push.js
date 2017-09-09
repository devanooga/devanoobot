var shell = require('shelljs')
var path = require('path')
/**
 * Commit changes, push to origin & submit a pull request.
 *
 * @param {object} data - The data necessary to perform git tasks.
 * @param {string} data.tmppath - The path to the temp directory to which the
 *   repo should be cloned.
 * @param {string} data.reponame - The name of the repo.
 * @param {string} data.msg - The message to be used in the commit.
 * @param {string} data.branch - The name of the current branch.
 *
 * @returns {string} Reference to the submitted pull request.
 *
 * @throws Will throw an error if any of the git tasks fail.
 */
module.exports = data => {
  // cd into project directory.
  shell.cd(path.join(data.tmppath, data.reponame))

  // Commit changes.
  if (shell.exec(`git commit -am '${data.msg}'`).code !== 0) {
    shell.echo('Error: Git commit failed.')
    shell.exit(1)
  }

  // Push changes to remote repo.
  if (shell.exec('git push').code !== 0) {
    shell.echo('Error: Git push failed.')
    shell.exit(1)
  }

  // Open a pull request against master.
  var pull_request = shell.exec(`hub pull-request -m '${data.msg}'`)
  if (pull_request.code !== 0) {
    shell.echo('Error: Hub pull-request failed.')
    shell.exit(1)
  } else {
    return pull_request
  }
}
