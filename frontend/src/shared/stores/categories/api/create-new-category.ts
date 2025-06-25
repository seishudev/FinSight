import { api } from '@/shared/api';
import type { CategoryType } from '../interactions/types';

export const createNewCategory = async (
  name: string,
  icon: string,
  type: CategoryType
) => {
  try {
    const response = await api.post(`/categories`, {
      name,
      icon,
      type
    });
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error: ${err}`);
    }
    throw new Error('Unknown error');
  }
};
