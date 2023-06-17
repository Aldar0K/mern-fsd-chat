import { chatApi } from 'entities/chat';
import { useHandleError, useInvalidate, useNotify } from 'shared/lib/hooks';
import { useChatStore } from '../chat-store';

export const useAccessChat = () => {
  const handleError = useHandleError();
  const setSelectedChat = useChatStore(state => state.setSelectedChat);
  const notify = useNotify();
  const invalidate = useInvalidate();

  const accessChat = async (userId: string) => {
    try {
      const chat = await chatApi.accessChat(userId);
      notify({ text: 'Chat received', type: 'success' });
      setSelectedChat(chat);
      invalidate('/chat');
    } catch (error) {
      handleError(error);
    }
  };

  return accessChat;
};
