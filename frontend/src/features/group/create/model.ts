import { useMutation, useQueryClient } from 'react-query';

import { chatApi, chatModel } from 'entities/chat';
import { useHandleError, useInvalidate, useNotify } from 'shared/lib/hooks';

export const useCreateGroup = () => {
  const handleError = useHandleError();
  const notify = useNotify();
  const invalidate = useInvalidate();
  const queryClient = useQueryClient();

  return useMutation(
    (createGroupDto: chatApi.CreateGroupDto) => {
      return chatApi.createGroup(createGroupDto);
    },
    {
      onSuccess(newChat) {
        notify({ text: 'Group created', type: 'success' });

        queryClient.setQueriesData<chatModel.Chat[]>(['/chats'], prevChats => [
          newChat,
          ...(prevChats || [])
        ]);
        invalidate(['/chats'], { refetchActive: false, refetchInactive: false });
      },
      onError(error) {
        handleError(error);
      }
    }
  );
};
