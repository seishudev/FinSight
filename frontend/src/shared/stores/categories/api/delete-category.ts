import { api } from '@shared/api';

export const deleteCategory = async (id: number) => {
  try {
    const response = await api.delete(`/categories/${id}`);
    return response;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error: ${err}`);
    }
    throw new Error('Unknown error');
  }
};
