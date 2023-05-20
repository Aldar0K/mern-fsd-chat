import { Chat, User } from 'models';

export interface Message {
  _id: string;
  sender: User;
  content: string;
  chat: Chat;
}
