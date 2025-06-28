import type { UserFinancialTarget } from '@/shared/model/UserFinancialTarget';
import { api } from '@/shared/api';

export const getMostUsedBudget = async () => {
  const res = await api.get<UserFinancialTarget>('/analytics/most-used');

  return res.data;
};
