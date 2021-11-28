/**
 * 004. 用戶交易token
 */
module.exports = async (ctx, next) => {
  if (!ctx.request.body.userId) ctx.throwApiError('004.001', 'missing userId');
  if (!ctx.request.body.targetId) ctx.throwApiError('004.002', 'missing targetId');
  if (!ctx.request.body.token) ctx.throwApiError('004.003', 'missing token');

  let userId = ctx.request.body.userId;
  let targetId = ctx.request.body.targetId;
  let token = parseInt(ctx.request.body.token);
  
  try {
    let toeknBefore = await ctx.service.user.getToken(userId);    
    if (token > toeknBefore) ctx.throwApiError('004.004', 'user token not enough');
    await ctx.service.user.transToken(userId, targetId, token);
    let toeknAfter = await ctx.service.user.getToken(userId);

    ctx.model = {
      toeknBefore: toeknBefore,
      toeknAfter: toeknAfter
    };
  } catch (err) {
    if (err.message == 'user token not enough') ctx.throwApiError('004.004', 'user token not enough');
    else throw err;
  }

  await next();
};