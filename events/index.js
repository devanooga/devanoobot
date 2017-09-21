const winston = require('winston')

module.exports = (req, res, next) => {
  // Respond to an Events API challenge.
  if (req.body.challenge) {
    return res.json({
      challenge: req.body.challenge,
    })
  }

  try {
    require(`./${req.body.event.type}`)(req, res, next)
  }
  catch (error) {
    // No handler found for event type. Respond w/200 and log the event.
    res.sendStatus(200)
    winston.error(error)
  }
}
