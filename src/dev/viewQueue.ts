import { Queue } from "bullmq";
import { config } from "../config/env";

const problemQueue = new Queue("problem-posts", {
  connection: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

(async () => {
  const jobs = await problemQueue.getJobs(["completed", "waiting", "active"], 0, 10);

  if (!jobs.length) {
    console.log(" No jobs found in problem-posts queue.");
    return;
  }

  jobs.forEach((job, i) => {
    console.log(`\n Job ${i + 1}:`);
    console.log(`Title: ${job.data.title}`);
    console.log(`Subreddit: ${job.data.subreddit}`);
    console.log(`Score: ${job.data.score}`);
    console.log(`Permalink: ${job.data.permalink}`);
    console.log(`Matched Keywords: ${job.data.matchedKeywords?.join(", ")}`);
  });
})();
