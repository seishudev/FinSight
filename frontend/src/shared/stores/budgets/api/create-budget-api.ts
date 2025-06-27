import type { PeriodType } from '@/entities/budget-card/ui/BudgetCard';
import { api } from '@/shared/api';

export const createBudgetApi = async (
  categoryId: number,
  limitAmount: number,
  period: PeriodType
) => {
  try {
    const response = await api.post('/budgets', {
      categoryId,
      limitAmount,
      period
    });
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error: ${err}`);
    }
    throw new Error('Unknown error');
  }
};
