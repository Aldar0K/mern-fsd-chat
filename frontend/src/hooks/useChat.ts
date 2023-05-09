import { useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

import { apiChat } from 'api';
import { handleError } from 'helpers';
import { useNotify, useToggle } from 'hooks';
import { ChatState, useChatStore } from 'store';

const selector = (state: ChatState) => ({
  chat: state.chat,
  setChat: state.setChat,
  chats: state.chats,
  setChats: state.setChats
});

// TODO separate useChats hook.
export const useChat = () => {
  const navigate = useNavigate();
  const { chat, setChat, chats, setChats } = useChatStore(selector, shallow);
  const notify = useNotify();
  const [isLoading, toggleLoading] = useToggle(false);

  // TODO use react-query for fetching chats?
  const getChats = async () => {
    toggleLoading();

    try {
      const chats = await apiChat.getChats();
      notify({ text: 'Chats received', type: 'success' });
      setChats(chats);
      // navigate(ROUTES.CHATS);
    } catch (error) {
      handleError(error);
    }

    toggleLoading();
  };

  const accessChat = async (userId: string) => {
    toggleLoading();

    try {
      const chat = await apiChat.accessChat(userId);
      notify({ text: 'Chat received', type: 'success' });
      setChat(chat);
      // navigate(ROUTES.CHATS);

      if (!chats.find(({ _id }) => _id === chat._id)) {
        setChats([...chats, chat]);
      }
    } catch (error) {
      handleError(error);
    }

    toggleLoading();
  };

  return { getChats, accessChat, isLoading };
};
