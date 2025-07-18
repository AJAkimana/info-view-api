import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';

let redisClient;

export const initializeRedisClient = async () => {
  // read the Redis connection URL from the envs
  let redisURL = process.env.REDIS_URI;
  if (redisURL) {
    // create the Redis client object
    redisClient = createClient({ url: redisURL }).on('error', (e) => {
      console.error(`Failed to create the Redis client with error:`);
      console.error(e);
    });

    try {
      // connect to the Redis server
      await redisClient.connect();
      console.log(`Connected to Redis successfully!`);
    } catch (e) {
      console.error(`Connection to Redis failed with error:`);
      console.error(e);
    }
  }
};

export const redisStore = new RedisStore({
  prefix: process.env.REDIS_PREFIX,
  client: redisClient,
});
