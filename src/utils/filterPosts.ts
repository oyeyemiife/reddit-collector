import { Submission } from 'snoowrap';
import { RedditPost } from '../types/redditPost';
import dotenv from "dotenv";
dotenv.config();

export function filterPost(
  post: Submission,
  keywords: string[],
  minScore: number
): RedditPost | null {
  if (post.over_18 || post.is_video || post.stickied || post.score < minScore) return null;

  const content = `${post.title} ${post.selftext}`.toLowerCase();
  const matchedKeywords = keywords.filter((k) =>
    content.includes(k.toLowerCase())
  );

  if (post.score < minScore) {
  console.log(" Rejected: score too low");
  return null;
}
if (post.over_18) {
  console.log(" Rejected: NSFW");
  return null;
}
if (post.stickied) {
  console.log(" Rejected: Promoted post");
  return null;
}
if (matchedKeywords.length === 0) {
  console.log(" Rejected: No keyword match");
  return null;
}


  return {
    id: post.id,
    title: post.title,
    body: post.selftext,
    author: post.author.name,
    score: post.score,
    numComments: post.num_comments,
    subreddit: post.subreddit_name_prefixed,
    permalink: `https://reddit.com${post.permalink}`,
    createdUtc: post.created_utc,
    url: post.url,
    flair: post.link_flair_text || undefined,
    isNsfw: post.over_18,
    isSelf: post.is_self,
    matchedKeywords,
  };
}
