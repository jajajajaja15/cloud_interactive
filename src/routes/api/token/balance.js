/**
 * 003. 查詢用戶餘額
 */
const TYPE_CHECK = [ 'user', 'all' ];
module.exports = async (ctx, next) => {
  if (!ctx.request.body.type || TYPE_CHECK.indexOf(ctx.request.body.type) == -1) ctx.throwApiError('003.001', 'check type error');
  if (ctx.request.body.type == 'user' && !ctx.request.body.userId && !ctx.request.body.username) ctx.throwApiError('003.002', 'username or userId required');

  ctx.model = {
    token: 0
  };

  try {
    let userId = ctx.request.body.userId || null;
    let username = ctx.request.body.username || null;
    
    if (ctx.request.body.type == 'user') {
      let userInfo = await ctx.service.user.getUserInfo(username, userId);
      if (!userInfo) ctx.throwApiError('003.003', 'user not exist');
      userId = userInfo.id;
    }
    ctx.model.token = await ctx.service.user.getToken(userId);
  } catch (err) {
    throw err;
  }

  await next();
};