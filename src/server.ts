// import express from 'express';
// import { fetchTopPosts } from './reddit.service';
// import * as dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// const PORT = 3000;

// app.get('/api/posts', async (req, res) => {
//   const { subreddit = 'technology', limit = '15' } = req.query;
//   try {
//     const posts = await fetchTopPosts(subreddit as string, parseInt(limit as string));
//     res.json(posts);
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//     res.status(500).json({ error: 'Failed to fetch posts' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server is running at http://localhost:${PORT}`);
// });



