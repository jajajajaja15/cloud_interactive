/**
 * 006 網路商店購買商品
 */
module.exports = async (ctx, next) => {
  if (!ctx.request.body.userId) ctx.throwApiError('006.001', 'missing userId');
  if (!ctx.request.body.productType) ctx.throwApiError('006.002', 'missing productType');
  if (!ctx.request.body.productId) ctx.throwApiError('006.003', 'missing productId');

  let productInfo = null;

  try {
    let userInfo = await ctx.service.user.getUserInfo(null, ctx.request.body.userId);
    if (!userInfo) ctx.throwApiError('006.004', 'user not exist');

    ctx.productList.forEach(element => {
      if (element.productType == ctx.request.body.productType && element.productId == ctx.request.body.productId) productInfo = element;
    });
    if (!productInfo) ctx.throwApiError('006.005', 'product not exist');
    if (productInfo.priceType == 'token' && parseInt(productInfo.price) > parseInt(userInfo.token)) ctx.throwApiError('006.006', 'user token not enough');

    await ctx.service.shop.buyProduct(ctx.request.body.userId, ctx.request.body.productId);

    userInfo = await ctx.service.user.getUserInfo(null, ctx.request.body.userId);

    await ctx.service.eventBus.publish('eventBus', 'user:' + userInfo.username + ' buy the product:' + productInfo.productName);

    ctx.model = {
      userInfo: userInfo,
      productInfo: productInfo
    };
  } catch (error) {
    throw error;
  }

  await next();
};