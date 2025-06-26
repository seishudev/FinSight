import { makeAutoObservable } from 'mobx';
import { fromPromise, type IPromiseBasedObservable } from 'mobx-utils';

import type { Budget } from '@/shared/model/Budget';
import { getMostUsedBudget } from '@/pages/home';

class BudgetsApiStore {
  constructor() { makeAutoObservable(this) }

  // STATES
  mostUsedBudget: IPromiseBasedObservable<Budget> | null = null;

  getMostUsedBudgetAction = () => {
    try {
      this.mostUsedBudget = fromPromise(getMostUsedBudget());
    } catch (e) {
      console.log(e);
    }
  };
}

export const budgetsApiStore = new BudgetsApiStore();
