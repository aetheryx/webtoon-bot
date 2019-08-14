const { createSignature } = require('@webtoon-bot/util');
const { URL_SEPERATOR } = require('./Constants');

module.exports = (url) =>
  process.env.PROXY_DOMAIN
    + encodeURIComponent(url)
    + URL_SEPERATOR
    + createSignature(url)
    + URL_SEPERATOR
    + '.png';
