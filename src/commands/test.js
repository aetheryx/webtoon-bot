const { generateProxyURL } = require('@webtoon-bot/proxy');
const { comics } = require('@webtoon-bot/db');

module.exports = {
  triggers: ['test'],
  async * run (msg, [ getter, setter ]) {
    if (setter) {
      yield comics.set(getter, setter).then(JSON.stringify);
    } else {
      yield comics.get(getter).then(JSON.stringify);
    }
  }
}