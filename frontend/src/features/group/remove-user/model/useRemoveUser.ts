import { useMutation, useQueryClient } from 'react-query';

import { chatApi, chatModel } from 'entities/chat';
import { viewerModel } from 'entities/viewer';
import { useHandleError, useInvalidate, useNotify } from 'shared/lib/hooks';

export const useRemoveUser = () => {
  const handleError = useHandleError();
  const notify = useNotify();
  const invalidate = useInvalidate();
  const queryClient = useQueryClient();
  const viewer = viewerModel.useViewer();

  return useMutation(
    (data: chatApi.RemoveUserDto) => {
      return chatApi.removeUser(data);
    },
    {
      onSuccess(updatedChat, variables) {
        notify({ text: 'User removed', type: 'success' });

        queryClient.setQueriesData<chatModel.Chat[]>(['/chats'], prevChats =>
          variables.userId === viewer?._id
            ? (prevChats || []).filter(chat => chat._id !== updatedChat._id)
            : (prevChats || []).map(chat => (chat._id === updatedChat._id ? updatedChat : chat))
        );
        invalidate(['/chats'], { refetchActive: false, refetchInactive: false });
      },
      onError(error) {
        handleError(error);
      }
    }
  );
};
