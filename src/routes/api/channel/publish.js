/**
 * 002. 用戶帳號資訊
 */
module.exports = async (ctx, next) => {
  if (!ctx.request.body.message) ctx.throwApiError('000.010', 'message required');

  try {
    await ctx.service.eventBus.publish(ctx.channel.topic, ctx.request.body.message);
   
    ctx.model = {
      status: 'success'
    };
  } catch (err) {
    throw err;
  }

  await next();
};