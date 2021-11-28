/**
 * 取消訂閱指定頻道
 */
module.exports = async (ctx, next) => {
  try {
    await ctx.service.eventBus.unsubscribe(ctx.channel.topic);
  } catch (err) {
    throw err;
  }

  await next();
};