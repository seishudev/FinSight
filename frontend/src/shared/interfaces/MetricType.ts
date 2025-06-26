import type { AnalyticsType } from './AnalyticsType';

export type MetricType = Exclude<AnalyticsType, 'transactions'>;