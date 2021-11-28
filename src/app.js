const Koa = require('koa');
const koaBody = require('koa-body');
const Routes = require('./routes');
const Service = require('./service');

module.exports = (server) => {
  const app = new Koa();

  app.context.server = server;
  app.context.console = server.console;
  app.context.service = Service(server);
  app.context.server.service = app.context.service;

  app.use(koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024    // 設置上傳文件大小最大限制，預設為2M
    }
  }));
  
  app.use( async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      logger.error(err);
      ctx.status = err.status || 200;
      let data = {
        d: ctx.query ? ctx.query.d : '',
        p: ctx.path,
        code: err.code || '500',
        message: err.message,
        stack: JSON.stringify(err.stack)
      };
      ctx.body = data;
      ctx.app.emit('error', err, ctx);
    }
  });

  app.use(Routes.routes());

  // Error Handling
  app.on('error', async (err, ctx) => {
    // todo send log to backend
  });

  return app;
};
