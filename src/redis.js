const RedisClient = require('ioredis');
module.exports = new RedisClient(process.env.REDIS_PORT);
