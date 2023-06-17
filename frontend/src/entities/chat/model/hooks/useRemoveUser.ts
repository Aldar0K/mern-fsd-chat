import { useMutation } from 'react-query';

import { chatApi } from 'entities/chat';
import { useHandleError, useInvalidate, useNotify } from 'shared/lib/hooks';

export const useRemoveUser = () => {
  const handleError = useHandleError();
  const notify = useNotify();
  const invalidate = useInvalidate();

  return useMutation(
    (data: chatApi.RemoveUserDto) => {
      return chatApi.removeUser(data);
    },
    {
      onSuccess() {
        notify({ text: 'User removed', type: 'success' });
        invalidate('/chat');
      },
      onError(error) {
        handleError(error);
      }
    }
  );
};
