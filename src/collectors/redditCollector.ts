import snoowrap from "snoowrap";
import { config } from "../config/env";
import { filterPost } from "../utils/filterPosts";
import { problemQueue } from "../queue/problemQueue";
import { RedditPost } from "../types/redditPost";

const reddit = new snoowrap({
  userAgent: process.env.REDDIT_USER_AGENT!,
  clientId: process.env.REDDIT_CLIENT_ID!,
  clientSecret: process.env.REDDIT_CLIENT_SECRET!,
  username: process.env.REDDIT_USERNAME!,
  password: process.env.REDDIT_PASSWORD!,
});

export async function collectRedditPosts(): Promise<void> {
  let totalFetched = 0;
  let totalMatched = 0;
  let totalQueued = 0;

  for (const subreddit of config.subreddits) {
    try {
      console.log(`Fetching from r/${subreddit}...`);

      const posts = await reddit
        .getSubreddit(subreddit)
        .getHot({ limit: config.fetchLimit });

      totalFetched += posts.length;

      const matchedPosts: RedditPost[] = [];

      for (const post of posts) {
        const filtered = filterPost(post, config.keywords, config.minScore);
        if (filtered) {
          matchedPosts.push(filtered);
        }
      }

      totalMatched += matchedPosts.length;

      const jobs = matchedPosts.map((post) =>
        problemQueue.add("problem-post", post)
      );

      await Promise.all(jobs);
      totalQueued += jobs.length;

      console.log(
        `r/${subreddit}: fetched ${posts.length}, matched ${matchedPosts.length}, queued ${jobs.length}`
      );
    } catch (err: any) {
      console.error(`Error fetching r/${subreddit}:`, err.message);
    }
  }

  console.log(`\n- Summary`);
  console.log(`Fetched: ${totalFetched}`);
  console.log(`Matched: ${totalMatched}`);
  console.log(`Queued: ${totalQueued}`);
}
if (require.main === module) {
  collectRedditPosts()
    .then(() => console.log("Collection complete"))
    .catch((err) => console.error("Collection failed:", err));
}
