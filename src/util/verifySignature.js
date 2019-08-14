const createSignature = require('./createSignature');

module.exports = (data, signature) =>
  createSignature(data) === signature;
