const Router = require('koa-router');
const router = new Router();

router
  .get('/productList', require('./productList'))
  .post('/buyProduct', require('./productList'), require('./buyProduct'));

module.exports = router;
