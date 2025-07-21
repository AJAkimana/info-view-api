import { getRedisClient } from '@configs/redis-client';
import { redisError } from '@libs/errors';
import { SetOptions } from 'redis';

export const readData = async <T = any>(key: string) => {
  const client = getRedisClient();
  try {
    const data = await client.get(key);
    return data ? (JSON.parse(data) as T) : null;
  } catch (error) {
    console.error(`Error reading data from Redis for key ${key}:`, error);
    throw redisError(`Error reading data for key ${key}`, error);
  }
};

export const writeData = async <T = any>(
  key: string,
  value: T,
  options?: SetOptions,
) => {
  const client = getRedisClient();
  try {
    await client.set(key, JSON.stringify(value), options);
  } catch (error) {
    console.error(`Error writing data to Redis for key ${key}:`, error);
    throw redisError(`Error writing data for key ${key}`, error);
  }
};
