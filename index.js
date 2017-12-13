// Load env variables from .env file.
require('dotenv').config()

const _ = require('lodash')
const bot = require('express')()
const body_parser = require('body-parser')
const winston = require('winston')

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
