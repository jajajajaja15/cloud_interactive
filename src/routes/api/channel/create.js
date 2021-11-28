/**
 * 建立新頻道列表
 */
module.exports = async (ctx, next) => {
  if (!ctx.request.body.topic) ctx.throwApiError('000', 'topic required');
  
  try {
    let description = ctx.request.body.description || 'none';
    let fn = function(msg, data) {
      // 要做的動作
      logger.log(data);
    };

    await ctx.service.eventBus.createChannel(ctx.request.body.topic, fn, description)
  } catch (err) {
    throw err;
  }

  await next();
};