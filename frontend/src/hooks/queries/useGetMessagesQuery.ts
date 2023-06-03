import { useQuery } from 'react-query';

import { useHandleError } from 'hooks';
import { apiMessage } from 'shared/api';

// TODO add onSuccess callback to params.
export const useGetMessagesQuery = (chatId: string) => {
  const handleError = useHandleError();

  return useQuery([`/message/${chatId}`], async () => await apiMessage.getMessages(chatId), {
    onError(error) {
      handleError(error);
    }
  });
};
