import { api } from '@/shared/api';

export const createTargetApi = async (
  name: string,
  icon: string,
  targetAmount: number,
  targetDate: string
) => {
  try {
    const response = await api.post('/goals', {
      name,
      icon,
      targetAmount,
      targetDate
    });
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error: ${err}`);
    }
    throw new Error(`Unknown error`);
  }
};
