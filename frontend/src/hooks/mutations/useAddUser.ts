import { useMutation } from 'react-query';

import { useHandleError, useInvalidate, useNotify } from 'shared/lib';
import { AddUserDto, apiChat } from 'entities/Chat';

export const useAddUser = () => {
  const handleError = useHandleError();
  const notify = useNotify();
  const invalidate = useInvalidate();

  return useMutation(
    (addUserDto: AddUserDto) => {
      return apiChat.addUser(addUserDto);
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
