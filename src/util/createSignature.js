const { createHmac } = require('crypto');

const key = Buffer.from(process.env.SIGNATURE_KEY, 'base64');
const base62 = (() => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  return [
    ...alphabet,
    ...alphabet.toUpperCase(),
    ...Array(10).fill().map((e, i) => i)
  ];
})();

module.exports = (data) =>
  [ ...createHmac('SHA256', key)
    .update(data)
    .digest() ]
    .map(byte => base62[byte % base62.length])
    .join('');
