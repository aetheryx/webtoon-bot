const { createSignature } = require('@webtoon-bot/util');
const { URL_SEPERATOR } = require('./Constants');
const { randomBytes } = require('crypto');

module.exports = (url) =>
  process.env.PROXY_DOMAIN
    + encodeURIComponent(url)
    + URL_SEPERATOR
    + createSignature(url)
    + URL_SEPERATOR
    + randomBytes(4).readUInt32LE().toString(16)
    + '.png';
