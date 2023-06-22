import { useQuery } from 'react-query';

import { DEFAULT_STALE_TIME } from 'shared/const';
import { useHandleError } from 'shared/lib/hooks';
import { getChats } from '../../api';

export const useChats = () => {
  const handleError = useHandleError();

  return useQuery(['/chats'], async () => await getChats(), {
    staleTime: DEFAULT_STALE_TIME,
    onError(error) {
      handleError(error);
    }
  });
};
