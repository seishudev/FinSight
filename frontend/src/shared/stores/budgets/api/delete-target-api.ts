import { api } from '@/shared/api';

export const deleteTargetApi = async (id: number) => {
  try {
    const response = await api.delete(`/goals/${id}`);
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error: ${err}`);
    }
    throw new Error('Unknown error');
  }
};
