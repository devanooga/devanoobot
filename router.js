const router = require('express').Router()

router.post('/events/:event_type?', require('./events'))
router.post('/commands/:command_type', require('./commands'))

module.exports = router
