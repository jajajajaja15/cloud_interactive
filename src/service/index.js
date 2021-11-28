const UserService = require('./user');
const TransactionService = require('./transaction');
const ShopService = require('./shop');
const EventBusService = require('./eventBus');

module.exports = function (server) {
  const service = { };
  service.user = new UserService(server);
  service.transaction = new TransactionService(server);
  service.shop = new ShopService(server);
  service.eventBus = new EventBusService(server);

  return service;
};
