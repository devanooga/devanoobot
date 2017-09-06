const router = new require('koa-router')()
router.post('/project', require('./project'))

module.exports = router
