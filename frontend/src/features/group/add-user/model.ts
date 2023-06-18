import { useMutation } from 'react-query';

import { chatApi } from 'entities/chat';
import { useHandleError, useInvalidate, useNotify } from 'shared/lib/hooks';

export const useAddUser = () => {
  const handleError = useHandleError();
  const notify = useNotify();
  const invalidate = useInvalidate();

  return useMutation(
    (addUserDto: chatApi.AddUserDto) => {
      return chatApi.addUser(addUserDto);
    },
    {
      onSuccess() {
        notify({ text: 'User added', type: 'success' });
        invalidate('/chat');
      },
      onError(error) {
        handleError(error);
      }
    }
  );
};
