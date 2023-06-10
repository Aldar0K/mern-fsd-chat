import { instance } from 'shared/api';
import { User } from '../model/types';

export const apiUser = {
  searchUser: async (searchValue?: string) => {
    const response = await instance.get<User[]>(`/user?search=${searchValue}`);
    return response.data;
  }
};
