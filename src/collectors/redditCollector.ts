import snoowrap from 'snoowrap';
import { config } from '../config/env';
import { RedditPost } from '../types/redditPost';
import { filterPost } from '../utils/filterPosts';
import { problemQueue } from '../queue/problemQueue';

const reddit = new snoowrap({
  userAgent: process.env.REDDIT_USER_AGENT!,
  clientId: process.env.REDDIT_CLIENT_ID!,
  clientSecret: process.env.REDDIT_CLIENT_SECRET!,
  username: process.env.REDDIT_USERNAME!,
  password: process.env.REDDIT_PASSWORD!,
});

export async function collectRedditPosts() {
  let totalFetched = 0;
  let matched = 0;
  let queued = 0;

  for (const sub of config.subreddits) {
    const posts = await reddit.getSubreddit(sub).getTop({ time: 'day', limit: config.fetchLimit });
    totalFetched += posts.length;

    for (const post of posts) {
      const match = filterPost(post, config.keywords, config.minScore);
      if (match) {
        matched++;
        try {
          await problemQueue.add('problem-post', match);
          queued++;
        } catch (err) {
          console.error(`Failed to queue post: ${post.id}`, err);
        }
      }
    }
  }

  console.log(`Fetched: ${totalFetched} | Matched: ${matched} | Queued: ${queued}`);
}
