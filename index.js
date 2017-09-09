require('dotenv').config()
const Koa = require('koa')
const bot = new Koa()
const body_parser = require('koa-bodyparser')

bot.use(body_parser())
bot.use(require('./router').routes())

bot.listen(3000)
