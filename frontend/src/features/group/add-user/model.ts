import { useMutation, useQueryClient } from 'react-query';

import { chatApi, chatModel } from 'entities/chat';
import { useHandleError, useInvalidate, useNotify } from 'shared/lib/hooks';

export const useAddUser = () => {
  const handleError = useHandleError();
  const notify = useNotify();
  const invalidate = useInvalidate();
  const queryClient = useQueryClient();

  return useMutation(
    (addUserDto: chatApi.AddUserDto) => {
      return chatApi.addUser(addUserDto);
    },
    {
      onSuccess(updatedChat) {
        notify({ text: 'User added', type: 'success' });

        queryClient.setQueriesData<chatModel.Chat[]>(['/chats'], prevChats =>
          (prevChats || []).map(chat => (chat._id === updatedChat._id ? updatedChat : chat))
        );
        invalidate(['/chats'], { refetchActive: false, refetchInactive: false });
      },
      onError(error) {
        handleError(error);
      }
    }
  );
};
