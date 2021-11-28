/**
 * 檢查頻道是否存在
 */
module.exports = async (ctx, next) => {
  if (!ctx.request.body.topic) ctx.throwApiError('000.001', 'topic required');
  ctx.channel = await ctx.service.eventBus.checkExist(ctx.request.body.topic);
  if (!ctx.channel) ctx.throwApiError('000.002', 'channel not exist');

  await next();
};