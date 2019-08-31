const { sleep } = require('@webtoon-bot/util');

module.exports = class Bucket {
  bucketID;
  remaining;
  limit;
  reset;
  resetAfter;
  processing = false;
  pendingRequests = [];

  setHeaders (headers) {
    this.limit      = +headers['x-ratelimit-limit'];
    this.reset      = +headers['x-ratelimit-reset'] * 1000;
    this.bucketID   =  headers['x-ratelimit-bucket'];
    this.remaining  = +headers['x-ratelimit-remaining'];
    this.resetAfter = +headers['x-ratelimit-reset-after'] * 1000;
  }

  queueRequest (req) {
    return new Promise(resolve => {
      this.pendingRequests.push({ req, resolve });
      if (!this.processing) {
        this.next();
      }
    });
  }

  async next () {
    if (this.pendingRequests.length === 0) {
      return;
    }

    this.processing = true;

    if (this.remaining === 0 && Date.now() < this.reset) {
      await sleep(this.resetAfter);
      this.remaining = this.limit;
    }

    const { req, resolve } = this.pendingRequests.shift();

    resolve(req.then(res => {
      this.setHeaders(res.headers);
      this.processing = false;
      this.next();
      return res;
    }));
  }
}