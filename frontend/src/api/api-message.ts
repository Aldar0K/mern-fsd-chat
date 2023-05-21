import { Chat, Message, User } from 'models';
import { instance } from './api';

export interface SendMessageDto {
  chatId: string;
  content: string;
}

interface SendMessageResponse {
  _id: string;
  sender: Pick<User, '_id' | 'name' | 'image'>;
  content: string;
  chat: Chat;
}

export const apiMessage = {
  getMessages: async (chatId: string) => {
    const response = await instance.get<Message[]>(`/message/${chatId}`);
    console.log(response.data);
    return response.data;
  },
  sendMessage: async (data: SendMessageDto) => {
    const response = await instance.post<SendMessageResponse>('/message', data);
    console.log(response.data);
    return response.data;
  }
};
