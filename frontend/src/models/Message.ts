import { User } from 'entities/User';
import { Chat } from 'models';

export interface Message {
  _id: string;
  sender: User;
  content: string;
  chat: Chat;
}
