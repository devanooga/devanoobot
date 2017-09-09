require('dotenv').config()
const Koa = require('koa')
const bot = new Koa()

bot.use(require('./router').routes())

bot.listen(3000)
