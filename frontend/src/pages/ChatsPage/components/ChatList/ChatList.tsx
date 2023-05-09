import { FC, useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

import { useChat, useNotify } from 'hooks';
import { User } from 'models';
import { ChatState, useChatStore, useUserStore } from 'store';

const selector = (state: ChatState) => ({
  chat: state.chat,
  setChat: state.setChat,
  chats: state.chats,
  setChats: state.setChats
});

const ChatList: FC = () => {
  const user = useUserStore(state => state.user);
  const { chat, setChat, chats, setChats } = useChatStore(selector, shallow);
  const { getChats, isLoading } = useChat();
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const notify = useNotify();

  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    console.log(chats);
  }, [chats]);

  return <div>ChatList</div>;
};

export default ChatList;
