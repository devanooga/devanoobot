const winston = require('winston')
const path = require('path')
const append_to_file = require('./append_to_file')
const checkout_new_branch = require('./checkout_new_branch')
const commit_and_push = require('./commit_and_push')
const report_result = require('./report_result')

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
    await checkout_new_branch({ tmppath, reponame, repourl, username, branch })
    await append_to_file({ filepath, text })
    const pull_request = await commit_and_push({ tmppath, reponame, msg, branch })
    await report_result({ response_url, pull_request, username })
  }
  catch (error) {
    winston.error(error)
  }
}
