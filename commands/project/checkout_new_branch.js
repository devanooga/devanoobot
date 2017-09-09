var shell = require('shelljs')
var path = require('path')
/**
 * Prepare working directory with a new branch.
 *
 * @param {object} data - An object with the values necessary to perform git tasks.
 * @param {string} data.tmppath - The path to the temp directory to which the
 *   repo should be cloned.
 * @param {string} data.reponame - The name of the repo.
 * @param {string} data.repourl - The URL of the repo to clone.
 * @param {string} data.username - The Slack username of the submitter.
 * @param {string} data.branch - The name of the branch to be created.
 *
 * @throws Will throw an exception if any of the git tasks fail.
 */
module.exports = data => {
  if (!shell.which('git') || !shell.which('hub')) {
    shell('This application requires git.')
    shell.exit(1)
  }

  // Create tmp dir if it doesn’t exist and cd into it.
  if (shell.cd(data.tmppath).code !== 0 &&
      (shell.mkdir(data.tmppath).code !== 0 || shell.cd(data.tmppath).code !== 0)) {
    shell.echo(`Error: Could not cd into nor mkdir ${data.tmppath}.`)
    shell.exit(1)
  }

  // Clone the repo if we haven’t already and cd into it.
  if (shell.cd(path.join(data.tmppath, data.reponame)).code !== 0 &&
      (shell.exec(`git clone git@${data.repourl}`).code !== 0 ||
      shell.cd(path.join(data.tmppath, data.reponame)).code !== 0)) {
    shell.echo(`Error: Could not cd into nor clone ${data.reponame}.`)
    shell.exit(1)
  }

  // Checkout master and pull latest.
  if (shell.exec('git checkout master && git pull').code !== 0) {
    shell.echo('Error: Git checkout or pull failed.')
    shell.exit(1)
  }

  // Create a new branch.
  if (shell.exec(`git checkout -b ${data.branch}`).code !== 0) {
    shell.echo(`Error: Git checkout -b ${data.branch} failed.`)
    shell.exit(1)
  }

  // Push new branch to remote and set upstream.
  if (shell.exec(`git push -u origin ${data.branch}`).code !== 0) {
    shell.echo('Error: Git push failed.')
    shell.exit(1)
  }

  return
}
