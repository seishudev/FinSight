import type { userAnalytics } from '../constants/user-analytics';

export type AnalyticsType = (typeof userAnalytics)[number]['type'];
