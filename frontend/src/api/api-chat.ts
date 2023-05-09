import { Chat } from 'models';
import { instance } from './api';

export const apiChat = {
  getChats: async () => {
    const response = await instance.get<Chat[]>('/chat');
    return response.data;
  },
  accessChat: async (userId: string) => {
    const response = await instance.post<Chat>('/chat', { userId });
    return response.data;
  }
};
