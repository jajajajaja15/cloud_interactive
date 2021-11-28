
function user(server) {
  this.server = server;
}

/**
 * 取得用戶資訊
 * @param {string} username 用戶名稱
 * @param {int} userId 用戶ID
 */
user.prototype.getUserInfo = async function (username, userId) {
  if (!username && !userId) throw new Error('username or userId required');
  let rds = this.server.rds;
  let whereObj = {};
  if (username) whereObj.username = username;
  if (userId) whereObj.id = userId;

  let userInfo = await rds('user').where(whereObj).first('*');
  if (userInfo) userInfo.hasSubscription = userInfo.hasSubscription ? true : false;

  return userInfo;
};

/**
 * 取得token餘額
 * @param {string} userId 用戶ID
 */
user.prototype.getToken = async function (userId) {
  let rds = this.server.rds;
  let token;
  if (userId) token = await rds('user').sum({ value: 'token'}).where({ id: userId });
  else token = await rds('user').sum({ value: 'token'});
  if (token[0] && token[0].value) return token[0].value;
  return 0;
};

/**
 * 用戶轉送token
 * @param {string} userId 用戶ID
 * @param {string} targetId 轉送對象ID
 * @param {int} token 轉送代幣數量
 */
user.prototype.transToken = async function (userId, targetId, token) {
  if (!userId) throw new Error('userId required');
  if (!targetId) throw new Error('targetId required');
  if (!token) throw new Error('token required');

  let rds = await this.server.service.transaction.new();

  try {
    await rds('user').where({id: userId}).increment({token: 0 - token});
    await rds('user').where({id: targetId}).increment({token: token});
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

/**
 * 註冊用戶
 * @param {string} username 用戶名稱
 */
user.prototype.new = async function (username) {
  if (!username) throw Error('username required');
  let rds = this.server.rds;

  try {
    await rds.insert({username: username}).into('user');
    let userInfo = await rds('user').where({ username: username }).first('*');
    if (userInfo) userInfo.hasSubscription = userInfo.hasSubscription ? true : false;

    return userInfo;
  } catch (err) {
    if (err.errno == '1062') {
      throw new Error('user exists');
    } else {
      throw new Error(err);
    }
  }
};

module.exports = user;