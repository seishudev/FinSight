import type { BudgetPeriod } from '../interfaces/BudgetPeriod';
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

export interface Target {
  id: number;
  name: string;
  icon: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  remainingAmount: number;
  percentage: number;
  overdue: boolean;
}
