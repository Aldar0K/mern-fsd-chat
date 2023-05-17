import { Chat } from 'models';
import { instance } from './api';

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
  },
  renameChat: async (renameChatDto: RenameChatDto) => {
    const response = await instance.put<Chat>('/chat/rename', renameChatDto);
    return response.data;
  },
  addUser: async (addUserDto: AddUserDto) => {
    const response = await instance.put<Chat>('/chat/groupadd', addUserDto);
    return response.data;
  }
};
