/**
 * 取消訂閱指定頻道
 */
module.exports = async (ctx, next) => {
  try {
    await ctx.service.eventBus.clearAllSubscriptions();
  } catch (err) {
    throw err;
  }

  await next();
};