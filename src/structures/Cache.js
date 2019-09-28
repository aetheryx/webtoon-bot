const redis = require('@webtoon-bot/redis');
const NAMESPACE_SEPERATOR = ':';

module.exports = class Cache {
  constructor ({ name, ttl, mode = 'EX' }) {
    this.name = name;
    this.ttl = ttl;
    this.mode = mode;
  }

  _getKey (key) {
    return key
      ? this.name + NAMESPACE_SEPERATOR + key
      : this.name;
  }

  set (data, key) {
    return redis.set(
      this._getKey(key),
      JSON.stringify(data),
      this.mode,
      this.ttl
    );
  }

  async get (key) {
    const data = await redis.get(this._getKey(key));
    return (data && JSON.parse(data));
  }
};
