import { useMutation } from 'react-query';

import { chatApi } from 'entities/chat';
import { useHandleError, useInvalidate, useNotify } from 'shared/lib/hooks';

export const useCreateGroup = () => {
  const handleError = useHandleError();
  const notify = useNotify();
  const invalidate = useInvalidate();

  return useMutation(
    (createGroupDto: chatApi.CreateGroupDto) => {
      return chatApi.createGroup(createGroupDto);
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
