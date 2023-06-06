import { useQuery } from 'react-query';

import { apiChat } from 'entities/Chat';
import { useHandleError } from 'shared/lib';

export const useChats = () => {
  const handleError = useHandleError();

  return useQuery(['/chat'], async () => await apiChat.getChats(), {
    onError(error) {
      handleError(error);
    }
  });
};
