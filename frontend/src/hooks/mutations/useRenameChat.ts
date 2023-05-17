import { useMutation } from 'react-query';

import { RenameChatDto, apiChat } from 'api';
import { useHandleError, useInvalidate, useNotify } from 'hooks';

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
