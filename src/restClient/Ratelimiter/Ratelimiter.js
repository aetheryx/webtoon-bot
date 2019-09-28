const Bucket = require('./Bucket');

module.exports = class Ratelimiter {
  #buckets = new Map();

  _createOrGetBucket (abstract) {
    if (this.#buckets.has(abstract)) {
      return this.#buckets.get(abstract);
    } else {
      const bucket = new Bucket();
      this.#buckets.set(abstract, bucket);
      return bucket;
    }
  }

  process (abstract, req) {
    const bucket = this._createOrGetBucket(abstract);
    return bucket.queueRequest(req);
  }
};
