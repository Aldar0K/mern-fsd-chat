import { useMutation } from 'react-query';

import { CreateGroupDto, apiChat } from 'api';
import { useHandleError, useInvalidate, useNotify } from 'hooks';

export const useCreateGroup = () => {
  const handleError = useHandleError();
  const notify = useNotify();
  const invalidate = useInvalidate();

  return useMutation(
    (createGroupDto: CreateGroupDto) => {
      return apiChat.createGroup(createGroupDto);
    },
    {
      onSuccess() {
        notify({ text: 'Group created', type: 'success' });
        invalidate('/chat');
      },
      onError(error) {
        handleError(error);
      }
    }
  );
};
