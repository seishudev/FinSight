import { api } from '@/shared/api';

export const getBudgetApi = async () => {
  try {
    const response = await api.get('/budgets');
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error: ${err}`);
    }
    throw new Error('Unknown error');
  }
};
