module.exports = (req, res, next) => {
  // Respond to an Events API challenge.
  if (!req.params.event_type) {
    return res.json({
      challenge: req.body.challenge,
    })
  }

  try {
    require(`./${req.params.event_type}`)(req, res, next)
  }
  catch (error) {
    // No handler found for event type. Respond w/200.
    res.send(200)
}
