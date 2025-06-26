import { makeAutoObservable } from 'mobx';
import type { BudgetType } from './types';

class BudgetInteractions {
  constructor() {
    makeAutoObservable(this);
  }

  budgetType: BudgetType = 'target';

  setBudgetType = (type: BudgetType) => (this.budgetType = type);
}

export const budgetInteractionsStore = new BudgetInteractions();
