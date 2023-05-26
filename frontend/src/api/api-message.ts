import { Message } from 'models';
import { instance } from './api';

export interface SendMessageDto {
  chatId: string;
  content: string;
}

export const apiMessage = {
  getMessages: async (chatId: string) => {
    const response = await instance.get<Message[]>(`/message/${chatId}`);
    console.log(response.data);
    return response.data;
  },
  sendMessage: async (data: SendMessageDto) => {
    const response = await instance.post<Message>('/message', data);
    console.log(response.data);
    return response.data;
  }
};
