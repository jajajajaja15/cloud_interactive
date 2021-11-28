
function shop(server) {
  this.server = server;
}

/**
 * 取得商店商品資訊
 */
 shop.prototype.getProductList = async function () {
  let rds = this.server.rds;
  let productList = await rds('productList').select('*');
  return productList;
};

/**
 * 購買指定商品
 * @param {string} userId 用戶ID
 * @param {string} productId 商品ID
 */
shop.prototype.buyProduct = async function (userId, productId) {
  if (!userId) throw new Error('userId required');
  if (!productId) throw new Error('productId required');

  let rds = await this.server.service.transaction.new();

  try {
    let productInfo = await rds('productList').where({productId: productId}).first('*');
    let token = productInfo.productType == 'token' ? 0 - parseInt(productInfo.price) : 0;
    token = token + parseInt(productInfo.token);

    if (productInfo.sub) await rds('user').where({id: userId}).increment({token: token}).update({hasSubscription: 1});
    else await rds('user').where({id: userId}).increment({token: token});

    await rds.commit();
  } catch (err) {
    await rds.rollback();
    if (err.errno == '1690') {
      throw new Error('user token not enough');
    } else {
      throw new Error(err);
    }
  }
};

module.exports = shop;