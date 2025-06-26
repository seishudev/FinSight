import { api } from '@shared/api';
import type { CategoryType } from '../interactions/types';

export const editCategoryApi = async (
  id: number,
  name: string,
  icon: string,
  type: CategoryType
) => {
  try {
    const response = await api.put(`/categories/${id}`, {
      name,
      icon,
      type
    });
    return response;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error: ${err}`);
    }
    throw new Error(`Unknown error`);
  }
};
