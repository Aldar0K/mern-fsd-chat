import { useNavigate } from 'react-router';

import { chatApi } from 'entities/chat';
import { ROUTES } from 'shared/const';
import { useHandleError, useToggle } from 'shared/lib/hooks';
import { useChatStore } from '../chat-store';

// TODO switch to mutation?
export const useAccessChat = () => {
  const handleError = useHandleError();
  const navigate = useNavigate();
  const [isLoading, toggleLoading] = useToggle(false);
  const setSelectedChat = useChatStore(state => state.setSelectedChat);

  const accessChat = async (userId: string) => {
    toggleLoading();

    try {
      const chat = await chatApi.accessChat(userId);
      setSelectedChat(chat);
      navigate(`${ROUTES.CHATS}/${chat._id}`);
    } catch (error) {
      handleError(error);
    }

    toggleLoading();
  };

  return [accessChat, isLoading] as const;
};
