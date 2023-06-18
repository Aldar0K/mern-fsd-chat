import { useMutation } from 'react-query';

import { chatApi } from 'entities/chat';
import { useHandleError, useInvalidate, useNotify } from 'shared/lib/hooks';

export const useRenameChat = () => {
  const handleError = useHandleError();
  const notify = useNotify();
  const invalidate = useInvalidate();

  return useMutation(
    (renameChatDto: chatApi.RenameChatDto) => {
      return chatApi.renameChat(renameChatDto);
    },
    {
      onSuccess() {
        notify({ text: 'Chat renamed', type: 'success' });
        invalidate('/chat');
      },
      onError(error) {
        handleError(error);
      }
    }
  );
};
