import { create } from 'zustand';

import { Chat } from './types';

export type ChatState = {
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat | null) => void;
  chats: Chat[];
  setChats: (chats: Chat[]) => void;
};

export const useChatStore = create<ChatState>(set => ({
  selectedChat: null,
  setSelectedChat: (selectedChat: Chat | null) => {
    set({ selectedChat });
  },
  chats: [],
  setChats: (chats: Chat[]) => {
    set({ chats });
  }
}));
