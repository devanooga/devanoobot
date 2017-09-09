// Load env variables from .env file.
require('dotenv').config()

// Build express app.
const bot = require('express')()
const body_parser = require('body-parser')

// Register body parser and routes.
bot.use(body_parser.json())
bot.use(body_parser.urlencoded({
  extended: true,
}))
bot.use(require('./router'))

// Listen for requests.
bot.listen(3000)
