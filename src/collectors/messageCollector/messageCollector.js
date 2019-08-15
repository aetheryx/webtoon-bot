const { messageCollectors } = require('@webtoon-bot/state');
const { KEY_DELIMITER, DEFAULT_TIMEOUT } = require('@webtoon-bot/collectors/Constants');

module.exports = {
  generateKey (msg) {
    return msg.channel_id + KEY_DELIMITER + msg.author.id;
  },

  awaitMessage (msg, timeout = DEFAULT_TIMEOUT) {
    return new Promise(resolve => {
      const key = this.generateKey(msg);

      const collector = {
        fulfill (message = null) {
          resolve(message);
          messageCollectors.delete(key);
        }
      };

      messageCollectors.set(key, collector);
      setTimeout(collector.fulfill, timeout);
    });
  },

  process (msg) {
    const key = this.generateKey(msg);

    if (messageCollectors.has(key)) {
      messageCollectors.get(key).fulfill(msg);
      return true;
    }
  }
};
