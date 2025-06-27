import { api } from '@/shared/api';

export const deleteBudgetApi = async (id: number) => {
  try {
    const response = await api.delete(`/budgets/${id}`);
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error: ${err}`);
    }
    throw new Error('Unknown error');
  }
};
