import { api } from '@shared/api';

export const signUp = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/sign-up', {
      email,
      password
    });
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`An authorization error occurred: ${err}`);
    }
    throw new Error('Unknown error during login');
  }
};
