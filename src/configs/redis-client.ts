import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';

let redisClient: ReturnType<typeof createClient> | null = null;

export const initializeRedisClient = async () => {
  // read the Redis connection URL from the envs
  let redisURL = process.env.REDIS_URI;
  if (redisURL && !redisClient?.isOpen) {
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

export const getRedisClient = () => {
  if (!redisClient) {
    throw new Error(
      'Redis client is not initialized. Call initializeRedisClient first.',
    );
  }
  return redisClient;
};

export const closeRedisClient = async () => {
  if (redisClient) {
    try {
      await redisClient.quit();
      console.log('Redis client closed successfully.');
    } catch (e) {
      console.error('Error closing Redis client:', e);
    }
  } else {
    console.warn('Redis client is not initialized, nothing to close.');
  }
};

initializeRedisClient()
  .then(() => {
    console.log('Redis client initialized successfully.');
  })
  .catch((error) => {
    console.error('Error initializing Redis client:', error);
  });

export const redisStore = new RedisStore({
  prefix: process.env.REDIS_PREFIX,
  client: getRedisClient(),
});
