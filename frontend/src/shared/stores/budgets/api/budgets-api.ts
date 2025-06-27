import { makeAutoObservable } from 'mobx';
import { fromPromise, type IPromiseBasedObservable } from 'mobx-utils';

import { getMostUsedBudget } from '@/pages/home';
import type { Budget, Target } from '@/shared/model/Budget';
import { getBudgetApi } from './get-budget-api';
import { getTargetApi } from './get-target-api';

class BudgetsApiStore {
  constructor() {
    makeAutoObservable(this);
  }

  // STATES
  mostUsedBudget: IPromiseBasedObservable<Budget> | null = null;
  budgets: IPromiseBasedObservable<Budget[]> | null = null;
  targets: IPromiseBasedObservable<Target[]> | null = null;

  getMostUsedBudgetAction = () => {
    try {
      this.mostUsedBudget = fromPromise(getMostUsedBudget());
    } catch (e) {
      console.error(e);
    }
  };

  getBudgetsAction = () => {
    try {
      this.budgets = fromPromise(getBudgetApi());
    } catch (e) {
      console.error(e);
    }
  };

  getTargetsAction = () => {
    try {
      this.targets = fromPromise(getTargetApi());
    } catch (e) {
      console.error(e);
    }
  };
}

export const budgetsApiStore = new BudgetsApiStore();
