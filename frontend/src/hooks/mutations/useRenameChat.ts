import { useMutation } from 'react-query';

import { useHandleError, useInvalidate, useNotify } from 'hooks';
import { RenameChatDto, apiChat } from 'entities/Chat';

export const useRenameChat = () => {
  const handleError = useHandleError();
  const notify = useNotify();
  const invalidate = useInvalidate();

  return useMutation(
    (renameChatDto: RenameChatDto) => {
      return apiChat.renameChat(renameChatDto);
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
