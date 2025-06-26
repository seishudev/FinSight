import { api } from '@shared/api';
import type { Category } from '../types';
import type { CategoryType } from '../interactions/types';

export const getCategoriesByType = async (type: CategoryType) => {
  try {
    const response = await api.get<Category[]>(
      `/categories/by-type?type=${type}`
    );
    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Error: ${e}`);
    }
    throw new Error(`Unknown error`);
  }
};
