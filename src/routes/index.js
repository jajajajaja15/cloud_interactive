const Router = require('koa-router');
const router = new Router();
const apiRoutes = require('./api');

router.get('/serverStatus', async (ctx) => {
  ctx.body = {
    code: '200',
    status: 'start'
  };
});

router.use('/api', apiRoutes.routes());

module.exports = router;