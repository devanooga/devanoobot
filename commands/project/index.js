const winston = require('winston')
const path = require('path')
const append_to_file = require('./append_to_file')
const checkout_new_branch = require('./checkout_new_branch')
const commit_and_push = require('./commit_and_push')
const report_result = require('./report_result')

module.exports = async (req, res, next) => {
  // Respond to the response immediately.
  res.send({
    text: 'I got it! Pull request incoming…',
    response_type: 'ephemeral',
  })

  // Verify request token.
  if (req.body.token !== process.env.SLACK_VERIFICATION_TOKEN) {
    return winston.error(new Error('Request token cannot be verified.'))
  }

  const username = req.body.user_name
  const tmppath = path.join(process.cwd(), '.tmp/')
  const reponame = 'devanooga-meta'
  const repourl = `github.com:devanooga/${reponame}.git`
  const branch = `project-idea-by-${username}-${Date.now()}`
  const filepath = path.join(tmppath, reponame, 'hack-night/projects.md')
  const text = `\n- ${req.body.text} (suggested by @${username})`
  const msg = `Add new project idea by ${username}`
  const response_url = req.body.response_url

  try {
    await checkout_new_branch({ tmppath, reponame, repourl, username, branch })
    await append_to_file({ filepath, text })
    const pull_request = await commit_and_push({ tmppath, reponame, msg, branch })

    const response_body = {
      text: `I submitted a new project idea on behalf of @${username}: ${pull_request}`,
      response_type: 'in_channel',
    }
    await report_result({ response_url, response_body })
  }
  catch (error) {
    winston.error(error)
  }
}
