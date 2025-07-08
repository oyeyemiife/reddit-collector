// import axios from 'axios';
// import * as dotenv from 'dotenv';

// dotenv.config();

// const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID!;
// const REDDIT_CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET!;
// const REDDIT_USER_AGENT = process.env.REDDIT_USER_AGENT!;

// async function getAccessToken(): Promise<string> {
//   try {
//     const res = await axios.post(
//       'https://www.reddit.com/api/v1/access_token',
//       new URLSearchParams({ grant_type: 'client_credentials' }),
//       {
//         auth: {
//           username: REDDIT_CLIENT_ID,
//           password: REDDIT_CLIENT_SECRET,
//         },
//         headers: {
//           'User-Agent': REDDIT_USER_AGENT,
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       }
//     );
//     return res.data.access_token;
//   } catch (error) {
//     console.error('Failed to get access token', error);
//     throw new Error('Reddit auth failed');
//   }
// }


// export async function fetchTopPosts(subreddit: string, limit = 15) {
//   const token = await getAccessToken();

//   const res = await axios.get(`https://oauth.reddit.com/r/${subreddit}/top?limit=${limit}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'User-Agent': REDDIT_USER_AGENT,
//     },
//   });

//   return res.data.data.children.map((item: any) => ({
//     title: item.data.title,
//     score: item.data.score,
//     url: item.data.url,
//     comments: item.data.num_comments,
//   }));
// }
