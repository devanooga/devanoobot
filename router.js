const router = new require('koa-router')()
router.post('/project', require('./commands/project'))

module.exports = router
