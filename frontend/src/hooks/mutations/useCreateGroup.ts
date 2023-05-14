import { useMutation } from 'react-query';

import { CreateGroupDto, apiChat } from 'api';
import { useHandleError, useNotify } from 'hooks';

export const useCreateGroup = () => {
  const handleError = useHandleError();
  const notify = useNotify();

  return useMutation(
    (createGroupDto: CreateGroupDto) => {
      return apiChat.createGroup(createGroupDto);
    },
    {
      onSuccess() {
        notify({ text: 'Group created', type: 'success' });
      },
      onError(error) {
        handleError(error);
      }
    }
  );
};
