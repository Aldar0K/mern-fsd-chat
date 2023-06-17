import { useQuery } from 'react-query';

import { apiChat } from 'entities/chat';
import { useHandleError } from 'shared/lib/hooks';

export const useChats = () => {
  const handleError = useHandleError();

  return useQuery(['/chat'], async () => await apiChat.getChats(), {
    onError(error) {
      handleError(error);
    }
  });
};
