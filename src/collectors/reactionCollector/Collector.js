const EventEmitter = require('events');
const { reactionCollectors } = require('@webtoon-bot/state');
const { DEFAULT_EXPIRY } = require('@webtoon-bot/collectors/Constants');

module.exports = class Collector extends EventEmitter {
  #key;
  #expiry;
  #expiryDate;
  #filter;

  constructor ({ key, filter = () => true, expiry = DEFAULT_EXPIRY }) {
    super();

    this.#key = key;
    this.#expiry = expiry;
    this.#filter = filter;

    this.checkExpiry();
  }

  process (reaction) {
    this.checkExpiry();
    super.emit('collected', reaction);
  }

  destroy () {
    super.emit('destroyed');
    super.removeAllListeners();
    reactionCollectors.delete(this.#key);
  }

  checkExpiry () {
    this.#expiryDate = Date.now() + this.#expiry;

    setTimeout(() => {
      if (Date.now() > this.#expiryDate) {
        this.destroy();
      }
    }, this.#expiry);
  }
};
