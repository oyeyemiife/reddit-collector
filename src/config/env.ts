import dotenv from 'dotenv';
dotenv.config();

export const config = {
  subreddits: process.env.REDDIT_SUBREDDITS!.split(','),
  minScore: parseInt(process.env.REDDIT_MIN_SCORE!),
  keywords: process.env.REDDIT_KEYWORDS!.split(','),
  fetchLimit: parseInt(process.env.REDDIT_FETCH_LIMIT!),
  sort: process.env.REDDIT_SORT!,
};
