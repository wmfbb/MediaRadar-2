export interface Source {
  id: string;
  name: string;
  url: string;
  type: 'rss' | 'website' | 'telegram' | 'api' | 'social';
  region: string;
  category: string;
  isActive: boolean;
  lastParsed: string;
  parseInterval: number;
  articlesCount: number;
  status: 'active' | 'error' | 'pending' | 'js-required';
  jsRendering: boolean;
  priority: 'high' | 'medium' | 'low';
  aiDiscovered: boolean;
  trustScore: number; // 0-100
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
  sentimentScore: number; // -1 to 1
  importance: number; // 1-10
  isBookmarked: boolean;
  entities: NamedEntity[];
  language: string;
  wordCount: number;
  readTime: number; // minutes
}

export interface NamedEntity {
  text: string;
  type: 'person' | 'organization' | 'location' | 'date' | 'money' | 'event' | 'product';
  confidence: number;
  count: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  lastLogin: string;
  isActive: boolean;
}

export type UserRole = 'superadmin' | 'admin' | 'analyst' | 'editor' | 'viewer' | 'client';

export interface RolePermissions {
  role: UserRole;
  label: string;
  description: string;
  permissions: string[];
  color: string;
}

export interface Tariff {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  features: string[];
  limits: {
    sources: number;
    articles: number;
    users: number;
    reports: number;
    storage: string;
    apiCalls: number;
  };
  isPopular?: boolean;
  yookassaId?: string;
}

export interface AIDiscoveryTask {
  id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  region: string;
  focus: string[];
  progress: number;
  foundSources: number;
  startedAt: string;
  completedAt?: string;
  results?: AIDiscoveryResult[];
}

export interface AIDiscoveryResult {
  url: string;
  name: string;
  type: string;
  relevance: number;
  category: string;
  trustScore: number;
  description: string;
  added: boolean;
}

export interface Report {
  id: string;
  title: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom' | 'topic';
  format: 'pdf' | 'excel' | 'dashboard' | 'html';
  createdAt: string;
  createdBy: string;
  status: 'draft' | 'generating' | 'ready' | 'failed';
  region: string;
  downloadUrl?: string;
}

export interface Integration {
  id: string;
  name: string;
  type: 'payment' | 'messaging' | 'analytics' | 'storage' | 'ai';
  status: 'connected' | 'disconnected' | 'error';
  config: Record<string, any>;
  lastSync?: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  channel: 'email' | 'telegram' | 'in-app' | 'webhook';
}

export interface FilterState {
  sources: string[];
  categories: string[];
  regions: string[];
  sentiment: string[];
  dateRange: { from: string; to: string };
  searchQuery: string;
  importance: [number, number];
  entities: string[];
}
