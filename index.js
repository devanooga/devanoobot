// Load env variables from .env file.
require('dotenv').config()

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
  if (req.body.token !== process.env.SLACK_VERIFICATION_TOKEN) {
    winston.error(new Error('Request token cannot be verified.'))
    return res.sendStatus(403)
  }
  next()
})

// Register routes.
bot.use(require('./router'))

// Listen for requests.
bot.listen(3000)
