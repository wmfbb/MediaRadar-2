export interface Source {
  id: string;
  name: string;
  url: string;
  type: 'rss' | 'website' | 'telegram' | 'api';
  region: string;
  category: string;
  isActive: boolean;
  lastParsed: string;
  parseInterval: number; // minutes
  articlesCount: number;
  status: 'active' | 'error' | 'pending';
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  sourceId: string;
  sourceName: string;
  url: string;
  publishedAt: string;
  parsedAt: string;
  category: string;
  region: string;
  tags: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  importance: number; // 1-10
  isBookmarked: boolean;
}

export interface AnalyticsData {
  date: string;
  articlesCount: number;
  sourcesActive: number;
  mentions: number;
}

export interface SentimentData {
  name: string;
  positive: number;
  negative: number;
  neutral: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export interface FilterState {
  sources: string[];
  categories: string[];
  regions: string[];
  sentiment: string[];
  dateRange: { from: string; to: string };
  searchQuery: string;
  importance: [number, number];
}

export interface ParseSchedule {
  id: string;
  sourceId: string;
  cronExpression: string;
  isActive: boolean;
  lastRun: string;
  nextRun: string;
}
