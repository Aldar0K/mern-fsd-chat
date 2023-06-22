import { create } from 'zustand';

import { Chat } from './types';

export type ChatState = {
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat | null) => void;
};

// TODO remove this store and use react-query instead?
export const useChatStore = create<ChatState>(set => ({
  selectedChat: null,
  setSelectedChat: (selectedChat: Chat | null) => {
    set({ selectedChat });
  }
}));
