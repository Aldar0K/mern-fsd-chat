import { create } from 'zustand';

import { Chat } from 'models';

export type ChatState = {
  chat: Chat | null;
  setChat: (chat: Chat | null) => void;
  chats: Chat[];
  setChats: (chats: Chat[]) => void;
};

export const useChatStore = create<ChatState>(set => ({
  chat: null,
  setChat: (chat: Chat | null) => {
    set({ chat });
  },
  chats: [],
  setChats: (chats: Chat[]) => {
    set({ chats });
  }
}));
