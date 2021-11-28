const PubSub = require('pubsub-js');

function eventBus(server) {
  this.server = server;

  this.server.channel = [ { 
    topic: 'eventBus',
    description: 'notify when someone publish to eventBus',
    fn: function(msg, data) {
      logger.log(data);
    }
  } ];
}

/**
 * 檢查是否頻道存在
 * @param {string} topic 頻道topic
 */
eventBus.prototype.checkExist = function (topic) {
  let channel = null;
  this.server.channel.forEach(element => {
    if (element.topic == topic) channel = element;
  });
  return channel;
};

/**
 * 建立頻道
 * @param {string} topic 頻道topic
 * @param {function} fn 收到的時候要做的動作
 */
eventBus.prototype.createChannel = async function (topic, fn, description) {
  let channel = this.checkExist(topic);
  if (!channel) this.server.channel.push({ topic: topic, fn: fn, description: description });
  else throw new Error('channel exist');
};

/**
 * 訂閱指定頻道
 * @param {string} topic 頻道
 * @param {function} fn 收到的時候要做的動作
 */
eventBus.prototype.subscribe = async function (topic) {
  let channel = this.checkExist(topic);
  if (channel) PubSub.subscribe(channel.topic, channel.fn);
  else throw new Error('channel not exist');
};

/**
 * 發送訊息至指定頻道
 * @param {string} topic 頻道
 * @param {string} data 內容
 */
eventBus.prototype.publish = async function (topic, data) {
  PubSub.publish(topic, data);
};

/**
 * 計算指定頻道訂閱數量
 */
 eventBus.prototype.countSubscriptions = async function (topic) {
  return PubSub.countSubscriptions(topic);
};

/**
 * 解除指定頻道所有訂閱者
 */
 eventBus.prototype.unsubscribe = async function (topic) {
  PubSub.unsubscribe(topic);
};

/**
 * 解除所有訂閱頻道
 */
 eventBus.prototype.clearAllSubscriptions = async function () {
  PubSub.clearAllSubscriptions();
};

module.exports = eventBus;
