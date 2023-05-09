import { useNavigate } from 'react-router-dom';

import { apiChat } from 'api';
import { handleError } from 'helpers';
import { useNotify, useToggle } from 'hooks';
import { useChatStore } from 'store';

// TODO separate useChats hook.
export const useChat = () => {
  const navigate = useNavigate();
  const setChat = useChatStore(state => state.setChat);
  const setChats = useChatStore(state => state.setChats);
  const notify = useNotify();
  const [isLoading, toggleLoading] = useToggle(false);

  const accessChat = async (userId: string) => {
    toggleLoading();

    try {
      const chat = await apiChat.accessChat(userId);
      notify({ text: 'Chat received', type: 'success' });
      console.log(chat);
      setChat(chat);
      // navigate(ROUTES.CHATS);
    } catch (error) {
      handleError(error);
    }

    toggleLoading();
  };

  return { accessChat, isLoading };
};
