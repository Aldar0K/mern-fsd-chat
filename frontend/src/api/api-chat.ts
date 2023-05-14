import { Chat } from 'models';
import { instance } from './api';

export interface CreateGroupDto {
  name: string;
  users: string;
}

export const apiChat = {
  getChats: async () => {
    const response = await instance.get<Chat[]>('/chat');
    return response.data;
  },
  accessChat: async (userId: string) => {
    const response = await instance.post<Chat>('/chat', { userId });
    return response.data;
  },
  createGroup: async (createGroupDto: CreateGroupDto) => {
    const response = await instance.post<Chat>('/chat/group', createGroupDto);
    return response.data;
  }
};
