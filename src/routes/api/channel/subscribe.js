/**
 * 訂閱指定頻道
 */
module.exports = async (ctx, next) => {
  try {
    await ctx.service.eventBus.subscribe(ctx.channel.topic);

    ctx.model = {
      info: ctx.channel
    };
  } catch (err) {
    throw err;
  }

  await next();
};