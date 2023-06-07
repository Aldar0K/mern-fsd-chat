import { instance } from 'shared/api';
import { Message } from '../model/types';

export interface SendMessageDto {
  chatId: string;
  content: string;
}

export const apiMessage = {
  getMessages: async (chatId: string) => {
    const response = await instance.get<Message[]>(`/message/${chatId}`);
    return response.data;
  },
  sendMessage: async (data: SendMessageDto) => {
    const response = await instance.post<Message>('/message', data);
    return response.data;
  }
};
