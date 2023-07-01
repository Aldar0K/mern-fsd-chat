import { instance } from 'shared/api';
import { Message } from '../model';

export interface SendMessageDto {
  chatId: string;
  content: string;
}

export const getMessages = async (chatId: string) => {
  const response = await instance.get<Message[]>(`/message/${chatId}`);
  return response.data;
};

export const sendMessage = async (data: SendMessageDto) => {
  const response = await instance.post<Message>('/message', data);
  return response.data;
};
