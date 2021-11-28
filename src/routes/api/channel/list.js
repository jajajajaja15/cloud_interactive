/**
 * 顯示頻道列表
 */
module.exports = async (ctx, next) => {

  try {    
    ctx.model = {
      list: ctx.server.channel
    };
  } catch (err) {
    throw err;
  }

  await next();
};