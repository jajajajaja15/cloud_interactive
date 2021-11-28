/**
 * 統計頻道訂閱數量
 */
module.exports = async (ctx, next) => {
  try {
    if (ctx.request.body.topic) {
      ctx.channel = await ctx.service.eventBus.checkExist(ctx.request.body.topic);
      if (!ctx.channel) ctx.throwApiError('000.002', 'channel not exist');
      ctx.model.count = await ctx.service.eventBus.countSubscriptions(ctx.channel.topic);
    } else {
      ctx.model.count = [];
      for (let i in  ctx.server.channel) {
        let count = await ctx.service.eventBus.countSubscriptions(ctx.server.channel[i].topic);
        ctx.model.count.push({ topic: ctx.server.channel[i].topic, count: count});
      }
    }
  } catch (err) {
    throw err;
  }

  await next();
};