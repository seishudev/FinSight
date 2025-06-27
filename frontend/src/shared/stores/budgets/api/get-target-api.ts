import { api } from '@/shared/api';

export const getTargetApi = async () => {
  try {
    const response = await api.get('/goals');
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error: ${err}`);
    }
    throw new Error('Unknown error');
  }
};
