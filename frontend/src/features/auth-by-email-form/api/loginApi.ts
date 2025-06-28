import { api } from '@shared/api';

export const signIn = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/sign-in', {
      email,
      password
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};
