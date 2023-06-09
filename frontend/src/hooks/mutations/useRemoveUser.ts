import { useMutation } from 'react-query';

import { RemoveUserDto, apiChat } from 'api';
import { useHandleError, useInvalidate, useNotify } from 'hooks';

export const useRemoveUser = () => {
  const handleError = useHandleError();
  const notify = useNotify();
  const invalidate = useInvalidate();

  return useMutation(
    (data: RemoveUserDto) => {
      return apiChat.removeUser(data);
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
