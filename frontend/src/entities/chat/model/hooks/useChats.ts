import { useQuery } from 'react-query';

import { chatModel } from 'entities/chat';
import { useHandleError } from 'shared/lib/hooks';
import { getChats } from '../../api';

export const useChats = () => {
  const setChats = chatModel.useChatStore(state => state.setChats);
  const handleError = useHandleError();

  return useQuery(['/chat'], async () => await getChats(), {
    onError(error) {
      handleError(error);
    },
    onSuccess(data) {
      // TODO remove this state in chat store?
      setChats(data);
    }
  });
};
