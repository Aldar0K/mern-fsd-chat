import { useMutation, useQueryClient } from 'react-query';

import { chatApi, chatModel } from 'entities/chat';
import { useHandleError, useInvalidate, useNotify } from 'shared/lib/hooks';

export const useLeaveGroup = () => {
  const handleError = useHandleError();
  const notify = useNotify();
  const invalidate = useInvalidate();
  const queryClient = useQueryClient();
  const setSelectedChat = chatModel.useChatStore(state => state.setSelectedChat);

  return useMutation(
    (data: chatApi.RemoveUserDto) => {
      return chatApi.removeUser(data);
    },
    {
      onSuccess(updatedChat) {
        notify({ text: 'You left the group', type: 'success' });

        queryClient.setQueriesData<chatModel.Chat[]>(['/chats'], prevChats =>
          (prevChats || []).filter(chat => chat._id !== updatedChat._id)
        );
        invalidate(['/chats'], { refetchActive: false, refetchInactive: false });

        setSelectedChat(null);
      },
      onError(error) {
        handleError(error);
      }
    }
  );
};
