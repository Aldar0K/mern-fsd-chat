import { useMutation, useQueryClient } from 'react-query';

import { chatApi, chatModel } from 'entities/chat';
import { useHandleError, useInvalidate, useNotify } from 'shared/lib/hooks';

export const useRemoveUser = () => {
  const handleError = useHandleError();
  const notify = useNotify();
  const invalidate = useInvalidate();
  const queryClient = useQueryClient();

  return useMutation(
    (data: chatApi.RemoveUserDto) => {
      return chatApi.removeUser(data);
    },
    {
      onSuccess(removedChat) {
        notify({ text: 'User removed', type: 'success' });

        queryClient.setQueriesData<chatModel.Chat[]>(['/chats'], prevChats =>
          (prevChats || []).filter(chat => chat._id !== removedChat._id)
        );
        invalidate(['/chats'], { refetchActive: false, refetchInactive: false });
      },
      onError(error) {
        handleError(error);
      }
    }
  );
};
