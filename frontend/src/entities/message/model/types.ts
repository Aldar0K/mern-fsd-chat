import { chatModel } from 'entities/chat';
import { userModel } from 'entities/user';

export interface Message {
  _id: string;
  sender: userModel.User;
  content: string;
  chat: chatModel.Chat;
}
