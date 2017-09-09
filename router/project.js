const winston = require('winston')
const project = require('../commands/project')
const path = require('path')

module.exports = async (ctx, next) => {
  // Respond to the response immediately.
  ctx.body = 'OK'
  await next()

  const username = ctx.request.body.user_name
  const tmppath = path.join(process.cwd(), '.tmp/')
  const reponame = 'devanooga-meta'
  const repourl = `github.com:devanooga/${reponame}.git`
  const branch = `project-idea-by-${username}-${Date.now()}`
  const filepath = path.join(tmppath, reponame, 'hack-night/projects.md')
  const text = `\n- ${ctx.request.body.text} (suggested by @${username})`
  const msg = `Add new project idea by ${username}`
  const response_url = ctx.request.body.response_url

  try {
    await project.checkout_new_branch({ tmppath, reponame, repourl, username, branch })
    await project.append_to_file({ filepath, text })
    const pull_request = await project.commit_and_push({ tmppath, reponame, msg, branch })
    await project.report_result({ response_url, pull_request, username })
  }
  catch (error) {
    winston.error(error)
  }
}
