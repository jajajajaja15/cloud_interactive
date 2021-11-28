/**
 * 002. 用戶帳號資訊
 */
module.exports = async (ctx, next) => {
  if (!ctx.request.body.username && !ctx.request.body.userId) ctx.throwApiError('002.001', 'username or userId required');

  let username = ctx.request.body.username || null;
  let userId = ctx.request.body.userId || null;

  try {
    let userInfo = await ctx.service.user.getUserInfo(username, userId);
    if (!userInfo) ctx.throwApiError('002.002', 'user not exist');
    
    ctx.model = {
      userInfo: userInfo
    };
  } catch (err) {
    throw err;
  }

  await next();
};