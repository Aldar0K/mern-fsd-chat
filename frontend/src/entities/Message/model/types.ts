import { Chat } from 'entities/Chat';
import { User } from 'entities/User';

export interface Message {
  _id: string;
  sender: User;
  content: string;
  chat: Chat;
}
