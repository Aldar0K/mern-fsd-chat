import { useQuery } from 'react-query';

import { apiMessage } from 'entities/Message';
import { useHandleError } from 'shared/lib';

export const useGetMessagesQuery = (chatId: string) => {
  const handleError = useHandleError();

  return useQuery([`/message/${chatId}`], async () => await apiMessage.getMessages(chatId), {
    onError(error) {
      handleError(error);
    }
  });
};
