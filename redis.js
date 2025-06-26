// redis.js
const Redis = require('ioredis');
const redis = new Redis(); // mặc định là localhost:6379

module.exports = redis;
