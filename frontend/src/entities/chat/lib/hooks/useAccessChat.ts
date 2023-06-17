import { apiChat, useChatStore } from 'entities/chat';
import { useHandleError, useInvalidate, useNotify } from 'shared/lib/hooks';

export const useAccessChat = () => {
  const handleError = useHandleError();
  const setSelectedChat = useChatStore(state => state.setSelectedChat);
  const notify = useNotify();
  const invalidate = useInvalidate();

  const accessChat = async (userId: string) => {
    try {
      const chat = await apiChat.accessChat(userId);
      notify({ text: 'Chat received', type: 'success' });
      setSelectedChat(chat);
      invalidate('/chat');
    } catch (error) {
      handleError(error);
    }
  };

  return accessChat;
};
