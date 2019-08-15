const { reactionCollector } = require('@webtoon-bot/collectors');
const restClient = require('@webtoon-bot/restClient');
const sleep = require('./sleep');

const Emojis = {
  PREV: '⬅',
  NEXT: '➡',
  STOP: '❌'
};

module.exports = async function createPaginatedMenu ({ msg, data }) {
  let currentIndex = 0;
  const message = await restClient.createMessage(msg.channel_id, {
    ...data[currentIndex],
    footer: { text: `Page 1/${data.length}` }
  });

  const collector = reactionCollector.createCollector({ messageID: message.id, userID: msg.author.id });

  await restClient.createReaction(msg.channel_id, message.id, Emojis.PREV);
  await sleep(250);
  await restClient.createReaction(msg.channel_id, message.id, Emojis.NEXT);
  await sleep(250);
  restClient.createReaction(msg.channel_id, message.id, Emojis.STOP);

  const update = (newContent) => {
    newContent.footer = { text: `Page ${currentIndex + 1}/${data.length}` };
    restClient.editMessage(msg.channel_id, message.id, newContent);
  };

  const stop = () => {
    restClient.bulkDeleteMessages(msg.channel_id, [ msg.id, message.id ]);
  };

  collector.on('collected', (reaction) => {
    switch (reaction.emoji.name) {
      case Emojis.PREV:
        restClient.deleteReaction(msg.channel_id, message.id, Emojis.PREV, reaction.user_id);
        return update(
          data[--currentIndex] || data[currentIndex = data.length - 1]
        );

      case Emojis.NEXT:
        restClient.deleteReaction(msg.channel_id, message.id, Emojis.NEXT, reaction.user_id);
        return update(
          data[++currentIndex] || data[currentIndex = 0]
        );

      case Emojis.STOP:
        return stop();

      default:
        break;
    }
  });
};
