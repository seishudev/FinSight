import { api } from '@shared/api';

export const signIn = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/sign-in', {
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
