import { useQuery } from 'react-query';

import { apiChat } from 'api';
import { useHandleError, useNotify } from 'hooks';

export const useChats = () => {
  const handleError = useHandleError();
  const notify = useNotify();

  return useQuery(['/chat'], async () => await apiChat.getChats(), {
    onSuccess() {
      notify({ text: 'Chats received', type: 'success' });
    },
    onError(error) {
      handleError(error);
    }
  });
};
