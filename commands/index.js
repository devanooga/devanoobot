module.exports = (req, res, next) => {
  require(`./${req.params.command_type}`)(req, res, next)
}
