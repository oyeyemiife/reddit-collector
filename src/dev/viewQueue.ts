import { problemQueue } from "../queue/problemQueue";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  console.log("Connecting to Redis at:", process.env.REDIS_HOST, process.env.REDIS_PORT);
  try {
    const jobs = await problemQueue.getJobs(["completed", "waiting", "active"], 0, 10);

    if (!jobs.length) {
      console.log(" No jobs found in problem-posts queue.");
      return;
    }

    jobs.forEach((job, i) => {
      const post = job.data;
      console.log(`\n [${i + 1}] ${post.title}`);
      console.log(` Author: ${post.author}`);
      console.log(` Subreddit: ${post.subreddit}`);
      console.log(` Comments: ${post.numComments}`);
      console.log(` Link: ${post.permalink}`);
      console.log(` Score: ${post.score}`);
      if (post.matchedKeywords) {
        console.log(` Matched Keywords: ${post.matchedKeywords.join(", ")}`);
      }
    });
  } finally {
    await problemQueue.close();
    console.log("Redis connection closed.");
  }
})();
