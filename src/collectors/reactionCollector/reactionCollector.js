const { reactionCollectors } = require('@webtoon-bot/state');
const { KEY_DELIMITER } = require('@webtoon-bot/collectors/Constants');
const Collector = require('./Collector');

module.exports = {
  generateKey (userID, messageID) {
    return userID + KEY_DELIMITER + messageID;
  },

  createCollector (opts) {
    opts.key = this.generateKey(opts.userID, opts.messageID);

    const collector = new Collector(opts);
    reactionCollectors.set(opts.key, collector);
    return collector;
  },

  process (reaction) {
    const key = this.generateKey(reaction.user_id, reaction.message_id);

    if (reactionCollectors.has(key)) {
      reactionCollectors.get(key).process(reaction);
      return true;
    }
  }
};
