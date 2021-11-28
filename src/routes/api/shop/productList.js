/**
 * 005 網路商店商品清單
 */
module.exports = async (ctx, next) => {
  ctx.model = ctx.model || {};

  try {
    let productList = await ctx.service.shop.getProductList();
    ctx.productList = productList;
    ctx.model.productList = productList;
  } catch (error) {
    throw error;
  }

  await next();
};