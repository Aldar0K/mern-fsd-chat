import { Message } from 'entities/message';
import { User } from 'entities/user';

export interface ServerToClientEvents {
  connected: () => void;
  typing: () => void;
  stopTyping: () => void;
  messageRecieved: (newMessage: Message) => void;
}

export interface ClientToServerEvents {
  setup: (user: User) => void;
  joinChat: (chatId: string) => void;
  newMessage: (newMessage: Message) => void;
  typing: (chatId: string) => void;
  stopTyping: (chatId: string) => void;
}
