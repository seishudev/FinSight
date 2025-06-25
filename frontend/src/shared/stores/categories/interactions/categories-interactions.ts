import { makeAutoObservable } from 'mobx';
import type { CategoryType } from './types';

class CategoriesInteractions {
  constructor() {
    makeAutoObservable(this);
  }

  categoryType: CategoryType = 'expense';

  setCategoryType = (type: CategoryType) => (this.categoryType = type);
}

export const categoriesInteractionsStore = new CategoriesInteractions();
