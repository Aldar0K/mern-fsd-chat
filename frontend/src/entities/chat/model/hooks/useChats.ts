import { useQuery } from 'react-query';

import { useHandleError } from 'shared/lib/hooks';
import { getChats } from '../../api';

export const useChats = () => {
  const handleError = useHandleError();

  return useQuery(['/chat'], async () => await getChats(), {
    onError(error) {
      handleError(error);
    }
  });
};
