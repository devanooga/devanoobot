const router = require('express').Router()
router.post('/project', require('./commands/project'))

module.exports = router
