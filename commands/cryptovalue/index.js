const winston = require('winston')
const got = require('got')
const url = 'https://api.coinmarketcap.com/v1/ticker/?convert=usd'

module.exports = (req, res, next) => {
  const input = req.body.text || 'bitcoin'

  return got(url).then(raw => {
    res.send({
      text: 'Can do! Querying...',
      response_type: 'ephemeral',
    })

    const response_url = req.body.response_url
    const response = JSON.parse(raw.body)
    const results = response.filter( (item) => {
      return item.id === input.toLowerCase() || item.symbol.toLowerCase() === input.toLowerCase()
    })

    let response_body

    if(results.length === 1) {
      let crypto = results[0]
      response_body = {
        text: `${crypto.name} (${crypto.symbol}) - $${crypto.price_usd} (USD)`,
        response_type: 'in_channel',
      }
    } else {
      response_body = {
        text: `Could not find crypto currency with the name: ${input}`,
        response_type: 'ephemeral',
      }
    }

    return got.post(response_url, {
      body: JSON.stringify(response_body),
    })
  }).catch(winston.error)
}
