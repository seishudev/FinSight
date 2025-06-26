import { makeAutoObservable } from 'mobx';
import { fromPromise, type IPromiseBasedObservable } from 'mobx-utils';

import type { UserSummaryAnalytics } from '@/shared/model/UserSummaryAnalytics';
import { getUserSummary } from '@/pages/analytics';

class AnalyticsApiStore {
  constructor() {
    makeAutoObservable(this);
  }

  // STATES
  summaryAnalytics: IPromiseBasedObservable<UserSummaryAnalytics[]> | null = null;

  // ACTIONS
  getUserSummaryAnalyticsAction = () => {
    try { this.summaryAnalytics = fromPromise(getUserSummary()) }
    catch (e) { console.log(e) }
  };
}

export const analyticsApiStore = new AnalyticsApiStore();
