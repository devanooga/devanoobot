module.exports = (req, res, next) => {
  // Respond to an Events API challenge.
  if (!req.params.event_type) {
    return res.json({
      challenge: req.body.challenge,
    })
  }

  require(`./${req.params.event_type}`)(req, res, next)
}
