require('./util/config').init();

Promise.all([
  require('@webtoon-bot/proxy').init(),
  require('@webtoon-bot/db').init()
]).then(() => {
  const WSClient = require('@webtoon-bot/ws');
  const handlers = require('@webtoon-bot/handlers');
  const wsClient = new WSClient();

  wsClient
    .on('dispatch:READY', handlers.ready)
    .on('dispatch:MESSAGE_CREATE', handlers.messageCreate)
    .on('dispatch:MESSAGE_REACTION_ADD', handlers.messageReactionAdd)
    .build();

  process.on('SIGINT', () => {
    wsClient.close();
    process.exit();
  });
});
