import { makeAutoObservable } from 'mobx';
import { fromPromise, type IPromiseBasedObservable } from 'mobx-utils';
import type { Category, CategoryType } from '../interactions/types';
import { getCategoriesByType } from './get-categories-by-type';

class CategoriesApiStore {
  constructor() {
    makeAutoObservable(this);
  }

  categoriesExpense: IPromiseBasedObservable<Category[]> | null = null;
  categoriesIncome: IPromiseBasedObservable<Category[]> | null = null;

  getCategoriesByTypeAction = (type: CategoryType) => {
    const promise = getCategoriesByType(type);
    const observablePromise = fromPromise(promise);

    if (type === 'income') {
      this.categoriesIncome = observablePromise;
    } else if (type === 'expense') {
      this.categoriesExpense = observablePromise;
    }
  };
}

export const categoriesApiStore = new CategoriesApiStore();
