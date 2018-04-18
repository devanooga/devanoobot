const router = require('express').Router()

router.post('/events', require('./events'))
router.post('/commands/:command_type', require('./commands'))
router.post('/workers', require('./workers/middleware'))

module.exports = router
