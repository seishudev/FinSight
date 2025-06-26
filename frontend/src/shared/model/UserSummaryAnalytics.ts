import type { AnalyticsType } from '../interfaces/AnalyticsType';
import type { MetricType } from '../interfaces/MetricType';

export interface UserSummaryAnalytics {
  amount: number;
  type: AnalyticsType;
}

export interface UserSummaryMetric
  extends Pick<UserSummaryAnalytics, 'amount'> {
  type: MetricType;
}
