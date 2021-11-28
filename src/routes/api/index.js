const Router = require('koa-router');
const router = new Router();
const ApiError = require('./middleware/apiError');

router.use(async (ctx, next) => {
  ctx.throwApiError = ApiError.throw;
  await next();
});

router.use(async (ctx, next) => {
  ctx.model = ctx.model || { };
  await next();
  ctx.model.code = '200';
  ctx.body = ctx.model;
});

router
  .use('/user',     require('./user').routes())
  .use('/token',     require('./token').routes())
  .use('/shop',      require('./shop').routes())
  .use('/channel',      require('./channel').routes());

module.exports = router;