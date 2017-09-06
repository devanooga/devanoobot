const winston = require('winston')
const project = require('../commands/project')

module.exports = async (ctx, next) => {
  // Respond to the response immediately.
  ctx.body = 'OK'
  await next()

  const username = ctx.request.body.user_name
  const tmppath = path.join(process.cwd(), '.tmp/')
  const repo = 'devanooga-meta'
  const repourl = `github.com:devanooga/${repo}.git`
  const branch = `project-idea-by-${username}-${Date.now()}`
  const filepath = path.join(tmppath, repo, 'hack-night/projects.md')
  const text = ctx.request.body.text
  const msg = `Add new project idea by ${username}`

  try {
    await project.checkout_new_branch({ tmppath, repourl, username })
    await project.append_to_file({ filepath, text, username })
    const pull_request = await project.commit_and_push({ msg, branch })
    await project.report_result({ pull_request, username })
  }
  catch (error) {
    winston.error(error)
  }
}
