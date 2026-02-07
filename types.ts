
export enum AppSection {
  DASHBOARD = 'DASHBOARD',
  SCRAPERS = 'SCRAPERS',
  MOBILE = 'MOBILE',
  SUBSCRIPTIONS = 'SUBSCRIPTIONS',
  SETTINGS = 'SETTINGS',
  AUDIT = 'AUDIT'
}

export interface ScraperStatus {
  id: string;
  name: string;
  lastRun: string;
  status: 'success' | 'failed' | 'running';
  recordsFound: number;
}

export interface SubscriptionStats {
  activeUsers: number;
  monthlyRevenue: number;
  pendingWebhooks: number;
  totalSubscribers: number;
}

export interface MobileStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  type: 'android' | 'ios' | 'general';
}
