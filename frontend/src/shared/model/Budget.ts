import type { BudgetPeriod } from '../interfaces/BudgetPeriod'
import type { Category } from '../stores/categories';

export interface Budget {
   id: number;
   limitAmount: number;
   period: BudgetPeriod;
   spentAmount: number;
   remainingAmount: number;
   percentageUsed: number;
   category: Category;
}