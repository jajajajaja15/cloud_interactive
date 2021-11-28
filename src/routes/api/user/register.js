/**
 * 001. 用戶帳號註冊
 */

module.exports = async (ctx, next) => {
  if (!ctx.request.body.username) ctx.throwApiError('001.001', 'missing username');

  let username = ctx.request.body.username;

  try {
    let checkExists = await ctx.service.user.getUserInfo(username);
    if (checkExists) ctx.throwApiError('001.002', 'user exist');

    let user = await ctx.service.user.new(username);

    ctx.model = {
      user: user
    };
  } catch (err) {
    throw err;
  }

  await next();
};