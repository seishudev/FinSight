import { api } from '@shared/api';

export const signUp = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/sign-up', {
      email,
      password
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};
