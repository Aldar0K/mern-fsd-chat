import { User } from 'models';
import { instance } from './api';

export const apiAuth = {
  login: async (email: string, password: string) => {
    const response = await instance.post<User>('/user/login', {
      email,
      password
    });
    return response.data;
  },
  register: async (name: string, email: string, password: string, imageUrl: string) => {
    const response = await instance.post<User>('/user', { name, email, password, imageUrl });
    return response.data;
  }
};
