import { Chat } from 'models';
import { instance } from './api';

export const apiChat = {
  accessChat: async (userId: string) => {
    const response = await instance.post<Chat>('/chat', { userId });
    return response.data;
  }
};
