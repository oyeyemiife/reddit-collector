// import { fetchTopPosts } from './reddit.service';

// async function main() {
//   const posts = await fetchTopPosts('technology', 15);
//   console.log(posts);
// }

// main().catch(console.error);


import cron from 'node-cron';
import { collectRedditPosts } from './collectors/redditcollector';

console.log('🕒 Reddit Collector Service Started');
cron.schedule('*/30 * * * *', async () => {
  console.log(`🔄 Running collection at ${new Date().toISOString()}`);
  await collectRedditPosts();
});
