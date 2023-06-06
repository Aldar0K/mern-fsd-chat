import { instance } from 'shared/api';
import { Chat } from '../model/types';

export interface CreateGroupDto {
  name: string;
  users: string;
}

export interface RenameChatDto {
  chatId: string;
  chatName: string;
}

export interface AddUserDto {
  chatId: string;
  userId: string;
}

export interface RemoveUserDto {
  chatId: string;
  userId: string;
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
  createGroup: async (data: CreateGroupDto) => {
    const response = await instance.post<Chat>('/chat/group', data);
    return response.data;
  },
  renameChat: async (data: RenameChatDto) => {
    const response = await instance.put<Chat>('/chat/rename', data);
    return response.data;
  },
  addUser: async (data: AddUserDto) => {
    const response = await instance.put<Chat>('/chat/groupadd', data);
    return response.data;
  },
  removeUser: async (data: RemoveUserDto) => {
    const response = await instance.put<Chat>('/chat/groupremove', data);
    return response.data;
  }
};
