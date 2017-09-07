var shell = require('shelljs')
var fs = require('fs')
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
module.exports = async data => {
  var file_stats = await fs.readdir(path.join(data.tmppath, data.reponame))
  if (!file_stats) {
    // Clone the damn repo.
  }

  if (!shell.which('git')) {
    shell('This application requires git.')
    shell.exit(1)
  }

  shell.cd(path.join(data.tmppath, data.reponame))
  if (shell.exec('git checkout master && git pull').code !== 0) {
    shell.echo('Error: Git checkout or pull failed.')
    shell.exit(1)
  }

  if (shell.exec(`git checkout -b ${data.branch}`).code !== 0) {
    shell.echo(`Error: Git checkout -b ${data.branch} failed.`)
    shell.exit(1)
  }

  if (shell.exec(`git push -u origin ${data.branch}`).code !== 0) {
    shell.echo(`Error: Git push failed.`)
    shell.exit(1)
  }

  return
}
