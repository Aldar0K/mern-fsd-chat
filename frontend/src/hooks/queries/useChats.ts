import { useQuery } from 'react-query';

import { apiChat } from 'api';
import { useHandleError } from 'hooks';

export const useChats = () => {
  const handleError = useHandleError();

  return useQuery(['/chat'], async () => await apiChat.getChats(), {
    onError(error) {
      handleError(error);
    }
  });
};
