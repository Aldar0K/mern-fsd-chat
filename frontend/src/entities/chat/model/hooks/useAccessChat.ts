import { chatApi } from 'entities/chat';
import { useHandleError, useNotify } from 'shared/lib/hooks';
import { useChatStore } from '../chat-store';

export const useAccessChat = () => {
  const handleError = useHandleError();
  const setSelectedChat = useChatStore(state => state.setSelectedChat);
  const notify = useNotify();

  // TODO update useAccessChat hook usage
  // return useQuery(['/chat'], async () => await accessChat(userId), {
  //   staleTime: DEFAULT_STALE_TIME,
  //   onError(error) {
  //     handleError(error);
  //   },
  //   onSuccess(data) {
  //     setSelectedChat(data);
  //     notify({ text: 'Chat received', type: 'success' });
  //   }
  // });

  const accessChat = async (userId: string) => {
    try {
      const chat = await chatApi.accessChat(userId);
      notify({ text: 'Chat received', type: 'success' });
      setSelectedChat(chat);
    } catch (error) {
      handleError(error);
    }
  };

  return accessChat;
};
