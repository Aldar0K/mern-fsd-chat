import { useMutation, useQueryClient } from 'react-query';

import { chatApi, chatModel } from 'entities/chat';
import { useHandleError, useInvalidate, useNotify } from 'shared/lib/hooks';

export const useRenameChat = () => {
  const handleError = useHandleError();
  const notify = useNotify();
  const invalidate = useInvalidate();
  const queryClient = useQueryClient();

  return useMutation(
    (renameChatDto: chatApi.RenameChatDto) => {
      return chatApi.renameChat(renameChatDto);
    },
    {
      onSuccess(updatedChat) {
        notify({ text: 'Chat renamed', type: 'success' });

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
