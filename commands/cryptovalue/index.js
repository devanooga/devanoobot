const winston = require('winston')
const got = require('got')
const url = 'https://api.coinmarketcap.com/v1/ticker/?convert=usd'

module.exports = (req, res, next) => {
  const input = req.body.text || 'bitcoin'

  return got(url).then(raw => {
    const response = JSON.parse(raw.body)
    const results = response.filter( (item) => {
      return item.id === input.toLowerCase() || item.symbol.toLowerCase() === input.toLowerCase()
    })

    if(results.length === 1) {
      var crypto = results[0]
      res.send({
        text: crypto.name + '(' + crypto.symbol + ') - $' + crypto.price_usd + '(USD)',
        response_type: 'in_channel',
      })
    } else {
      res.send({
        text: 'Could not find crypto currency with the name: ' + input,
        response_type: 'ephemeral',
      })
    }
  }).catch(winston.error)
}