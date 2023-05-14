import { useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

import { apiChat } from 'api';
import { ROUTES } from 'consts';
import { useHandleError, useNotify } from 'hooks';
import { ChatState, useChatStore } from 'store';

const selector = (state: ChatState) => ({
  setSelectedChat: state.setSelectedChat,
  chats: state.chats,
  setChats: state.setChats
});

export const useAccessChat = () => {
  const navigate = useNavigate();
  const handleError = useHandleError();
  const { setSelectedChat, chats, setChats } = useChatStore(selector, shallow);
  const notify = useNotify();

  const accessChat = async (userId: string) => {
    try {
      const chat = await apiChat.accessChat(userId);
      notify({ text: 'Chat received', type: 'success' });
      setSelectedChat(chat);
      navigate(ROUTES.CHATS);

      if (!chats.find(({ _id }) => _id === chat._id)) {
        setChats([...chats, chat]);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return accessChat;
};
