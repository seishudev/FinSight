import { makeAutoObservable, runInAction } from 'mobx';
import type { CategoryType } from '../interactions/types';
import type { Category } from '../types';
import { getCategoriesByType } from './get-categories-by-type';

type StoreState = 'initial' | 'pending' | 'fulfilled' | 'rejected';

class CategoriesApiStore {
  categoriesExpense: Category[] = [];
  categoriesIncome: Category[] = [];
  expenseState: StoreState = 'initial';
  incomeState: StoreState = 'initial';

  constructor() {
    makeAutoObservable(this);
  }

  addCategoryAction = (category: Category) => {
    if (category.type === 'income') {
      this.categoriesIncome = [...this.categoriesIncome, category];
    } else {
      this.categoriesExpense = [...this.categoriesExpense, category];
    }
  };

  deleteCategoryAction = (id: number, type: CategoryType) => {
    if (type === 'income') {
      this.categoriesIncome = this.categoriesIncome.filter(c => c.id !== id);
    } else {
      this.categoriesExpense = this.categoriesExpense.filter(c => c.id !== id);
    }
  };

  updateCategoryInPlaceAction = (category: Category) => {
    if (category.type === 'income') {
      this.categoriesIncome = this.categoriesIncome.map(c =>
        c.id === category.id ? category : c
      );
    } else {
      this.categoriesExpense = this.categoriesExpense.map(c =>
        c.id === category.id ? category : c
      );
    }
  };

  getCategoriesByTypeAction = async (type: CategoryType) => {
    if (type === 'income') {
      this.incomeState = 'pending';
    } else {
      this.expenseState = 'pending';
    }

    try {
      const categories = await getCategoriesByType(type);
      runInAction(() => {
        if (type === 'income') {
          this.categoriesIncome = categories;
          this.incomeState = 'fulfilled';
        } else {
          this.categoriesExpense = categories;
          this.expenseState = 'fulfilled';
        }
      });
    } catch (e) {
      runInAction(() => {
        if (type === 'income') {
          this.incomeState = 'rejected';
        } else {
          this.expenseState = 'rejected';
        }
      });
    }
  };
}

export const categoriesApiStore = new CategoriesApiStore();
