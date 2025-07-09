import { Queue } from "bullmq";
import dotenv from "dotenv";
dotenv.config();

const redisHost = process.env.REDIS_HOST || "127.0.0.1";
const redisPort = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379;

console.log(" Connecting to Redis at", redisHost, "on port", redisPort);

export const problemQueue = new Queue("problem-posts", {
  connection: {
    host: redisHost,
    port: redisPort,
  },
  defaultJobOptions: {
    removeOnComplete: true,
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 500,
    },
  },
});
