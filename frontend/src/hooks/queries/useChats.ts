import { useQuery } from 'react-query';

import { useHandleError } from 'hooks';
import { apiChat } from 'shared/api';

export const useChats = () => {
  const handleError = useHandleError();

  return useQuery(['/chat'], async () => await apiChat.getChats(), {
    onError(error) {
      handleError(error);
    }
  });
};
