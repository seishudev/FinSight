import { makeAutoObservable, runInAction } from 'mobx';

import { getMostUsedBudget } from '@/pages/home';
import type { Budget, Target } from '@/shared/model/Budget';
import { fromPromise, type IPromiseBasedObservable } from 'mobx-utils';
import { getBudgetApi } from './get-budget-api';
import { getTargetApi } from './get-target-api';
import type { UserFinancialTarget } from '@/shared/model/UserFinancialTarget'

type StoreState = 'initial' | 'pending' | 'fulfilled' | 'rejected';

class BudgetsApiStore {
  constructor() { makeAutoObservable(this) }

  // STATES
  mostUsedBudget: IPromiseBasedObservable<UserFinancialTarget> | null = null;
  budgets: Budget[] = [];
  targets: Target[] = [];
  budgetsState: StoreState = 'initial';
  targetsState: StoreState = 'initial';

  // ACTIONS
  addBudgetAction = (budget: Budget) => {
    this.budgets.unshift(budget);
  };

  addTargetAction = (target: Target) => {
    this.targets.unshift(target);
  };

  deleteBudgetAction = (id: number) => {
    this.budgets = this.budgets.filter(b => b.id !== id);
  };

  deleteTargetAction = (id: number) => {
    this.targets = this.targets.filter(t => t.id !== id);
  };

  getMostUsedBudgetAction = () => {
    try {
      this.mostUsedBudget = fromPromise(getMostUsedBudget());
    } catch (e) {
      console.error(e);
    }
  };

  getBudgetsAction = async () => {
    this.budgetsState = 'pending';
    try {
      const budgets = await getBudgetApi();
      runInAction(() => {
        this.budgets = budgets;
        this.budgetsState = 'fulfilled';
      });
    } catch (e) {
      runInAction(() => {
        this.budgetsState = 'rejected';
      });
      console.error(e);
    }
  };

  getTargetsAction = async () => {
    this.targetsState = 'pending';
    try {
      const targets = await getTargetApi();
      runInAction(() => {
        this.targets = targets;
        this.targetsState = 'fulfilled';
      });
    } catch (e) {
      runInAction(() => {
        this.targetsState = 'rejected';
      });
      console.error(e);
    }
  };

  updateTargetFundsAction = (updatedTarget: Target) => {
    const index = this.targets.findIndex(t => t.id === updatedTarget.id);
    if (index !== -1) {
      this.targets[index] = updatedTarget;
    }
  };
}

export const budgetsApiStore = new BudgetsApiStore();
