import { useMutation } from 'react-query';

import { useHandleError, useInvalidate, useNotify } from 'hooks';
import { RemoveUserDto, apiChat } from 'shared/api';

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
