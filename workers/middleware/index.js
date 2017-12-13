var _ = require('lodash')

module.exports = (req, res, next) => {
  req.payload = JSON.parse(req.body.payload)
  var action_name = _.get(req.payload, 'actions[0].name')
  var action_value = _.get(req.payload, 'actions[0].value')

  require(`./${action_name}/${action_value}`)(req, res, next)
}
