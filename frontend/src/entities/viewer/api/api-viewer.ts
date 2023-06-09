import { instance } from 'shared/api';
import { Viewer } from '../model/types';

export const apiUser = {
  login: async (email: string, password: string) => {
    const response = await instance.post<Viewer>('/user/login', {
      email,
      password
    });
    return response.data;
  },
  register: async (name: string, email: string, password: string, imageUrl: string) => {
    const response = await instance.post<Viewer>('/user', { name, email, password, imageUrl });
    return response.data;
  },
  searchUser: async (searchValue?: string) => {
    const response = await instance.get<Viewer[]>(`/user?search=${searchValue}`);
    return response.data;
  }
};
