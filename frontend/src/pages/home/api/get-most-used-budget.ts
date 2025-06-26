import { api } from '@/shared/api';
import type { Budget } from '@/shared/model/Budget';

export const getMostUsedBudget = async () => {
  const res = await api.get<Budget>('/budgets/most-used');

  return res.data;
};
