const state = require('@webtoon-bot/state');

module.exports = function onReady (gatewayState) {
  state.gatewayState = gatewayState;
  console.log('Logged in as', gatewayState.user.username);
};
