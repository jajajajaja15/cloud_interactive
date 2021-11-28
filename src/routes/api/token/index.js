const Router = require('koa-router');
const router = new Router();

router
  .post('/balance',   require('./balance'))
  .post('/transfer',   require('./transfer'));

module.exports = router;