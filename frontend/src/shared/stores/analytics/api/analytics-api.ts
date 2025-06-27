import { makeAutoObservable } from 'mobx';
import { fromPromise, type IPromiseBasedObservable } from 'mobx-utils';

import type { UserSummaryAnalytics } from '@/shared/model/UserSummaryAnalytics';
import type { CategoriesAnalytics } from '@/shared/model/CategoriesAnalytics';
import type { Spending } from '@/shared/model/Spending';
import { getCategoriesAnalytics } from '@/pages/analytics/api/get-categories-analytics';
import { getWeeklytSpendingTrend } from '@/pages/analytics/api/get-weekly-spending-trend';
import { getUserSummary } from '@/pages/analytics';

class AnalyticsApiStore {
  constructor() {
    makeAutoObservable(this);
  }

  // STATES
  summaryAnalytics: IPromiseBasedObservable<UserSummaryAnalytics[]> | null = null;
  categoriesAnalytics: IPromiseBasedObservable<CategoriesAnalytics> | null = null;
  spendingTrendAnalytics: IPromiseBasedObservable<Spending[]> | null = null;

  // ACTIONS
  getUserSummaryAnalyticsAction = () => {
    try { this.summaryAnalytics = fromPromise(getUserSummary()) }
    catch (e) { console.log(e) }
  };

  getCategoriesAnalyticsAction = () => {
    try { this.categoriesAnalytics = fromPromise(getCategoriesAnalytics()) }
    catch (e) { console.log(e) }
  };

  getWeeklySpendingTrendAction = () => {
    try { this.spendingTrendAnalytics = fromPromise(getWeeklytSpendingTrend()) }
    catch (e) { console.log(e) }
  };
}

export const analyticsApiStore = new AnalyticsApiStore();
