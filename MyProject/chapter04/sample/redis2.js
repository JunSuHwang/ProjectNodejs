const redis = require('redis');
const client = redis.createClient(6379, '127.0.0.1');

client.rpush('mylist', 0);
client.rpush('mylist', 1);
client.rpush('mylist', 2);
