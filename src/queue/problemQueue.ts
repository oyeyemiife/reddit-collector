import { Queue } from 'bullmq';
import { createClient } from 'redis';

const redisConnection = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
};

export const problemQueue = new Queue('problem-posts', {
  connection: redisConnection,
});
