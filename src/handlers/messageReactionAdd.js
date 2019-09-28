const { reactionCollector } = require('@webtoon-bot/collectors');

module.exports = (reaction) => {
  reactionCollector.process(reaction);
};
