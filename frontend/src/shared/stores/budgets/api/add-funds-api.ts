import { api } from '@/shared/api';

export const addFundsApi = async (id: number, amount: number) => {
  try {
    const response = await api.patch(`/goals/${id}/add-funds`, {
      amount
    });
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error: ${err}`);
    }
    throw new Error('Unknown error');
  }
};
