import { messageModel } from 'entities/message';
import { userModel } from 'entities/user';

export interface ServerToClientEvents {
  connected: () => void;
  typing: () => void;
  stopTyping: () => void;
  messageRecieved: (newMessage: messageModel.Message) => void;
}

export interface ClientToServerEvents {
  setup: (user: userModel.User) => void;
  joinChat: (chatId: string) => void;
  newMessage: (newMessage: messageModel.Message) => void;
  typing: (chatId: string) => void;
  stopTyping: (chatId: string) => void;
}
