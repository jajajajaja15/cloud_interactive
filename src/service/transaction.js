function transaction(server) {
  this.server = server;
}

/**
 * 產生一個新的交易
 */
transaction.prototype.new = async function () {
  let rds = this.server.rds;
  return new Promise(function (resolve, reject) {
    try {
      rds.transaction(trx => {
        resolve(trx);
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = transaction;