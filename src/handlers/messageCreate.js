const restClient = require('@webtoon-bot/restClient');
const { getPrefixFromMessage } = require('@webtoon-bot/util');
const { messageCollector } = require('@webtoon-bot/collectors');
const commands = require('@webtoon-bot/commands');

module.exports = async function onMessageCreate (msg) {
  if (
    msg.author.bot ||
    (!msg.author.bot && messageCollector.process(msg))
  ) {
    return;
  }

  const prefix = getPrefixFromMessage(msg);
  if (!msg.content.startsWith(prefix)) {
    return;
  }

  const [ commandName, ...args ] = msg.content.slice(prefix.length).split(/ +/g);
  const command = commands[commandName];
  if (!command) {
    return;
  }

  for await (const result of command.run(msg, args)) {
    restClient.createMessage(msg.channel_id, result);
  }
};
