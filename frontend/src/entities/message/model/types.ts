import { Chat } from 'entities/chat';
import { User } from 'entities/user';

export interface Message {
  _id: string;
  sender: User;
  content: string;
  chat: Chat;
}
