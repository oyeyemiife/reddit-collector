import cron from "node-cron";
import { collectRedditPosts } from "./collectors/redditCollector";

console.log(" Reddit Collector started");

cron.schedule("*/30 * * * *", async () => {
  console.log(" Running scheduled job...");
  await collectRedditPosts();
});