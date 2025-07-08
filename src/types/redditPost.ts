export interface RedditPost {
  id: string;
  title: string;
  body: string;
  author: string;
  score: number;
  numComments: number;
  subreddit: string;
  permalink: string;
  createdUtc: number;
  url: string;
  flair?: string;
  isNsfw: boolean;
  isSelf: boolean;
  matchedKeywords?: string[];
}
