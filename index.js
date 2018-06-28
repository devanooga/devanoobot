// Load env variables from .env file.
require('dotenv').config()

const _ = require('lodash')
const bot = require('express')()
const body_parser = require('body-parser')
const winston = require('winston')
const slack_winston = require('slack-winston').Slack
winston.add(slack_winston, {
  domain: 'devanooga',
  token: process.env.SLACK_VERIFICATION_TOKEN,
  webhook_url: process.env.SLACK_LOGS_WEBHOOK_URL,
  channel: 'devanoobot_logs',
  level: 'error',
  message: '*{{message}}*\n\n```\n{{meta}}\n```',
})

// Register body parser.
bot.use(body_parser.json())
bot.use(body_parser.urlencoded({
  extended: true,
}))

// Verify request token.
bot.use((req, res, next) => {
  try {
    var token = req.body.token || JSON.parse(_.get(req, 'body.payload', {})).token
  }
  catch (err) {
    winston.error(err)
  }
  if (token !== process.env.SLACK_VERIFICATION_TOKEN) {
    winston.error(new Error('Request token cannot be verified.'))
    return res.sendStatus(403)
  }
  next()
})

// Register routes.
bot.use(require('./router'))

// Listen for requests.
bot.listen(3000)
