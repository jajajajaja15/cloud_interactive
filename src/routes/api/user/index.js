const Router = require('koa-router');
const router = new Router();

router
  .post('/register',  require('./register'))
  .post('/info',    require('./info'));

module.exports = router;