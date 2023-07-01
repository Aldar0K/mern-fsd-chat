import { useQuery } from 'react-query';

import { messageApi } from 'entities/message';
import { useHandleError } from 'shared/lib/hooks';

export const useGetMessagesQuery = (chatId: string) => {
  const handleError = useHandleError();

  return useQuery([`/message/${chatId}`], async () => await messageApi.getMessages(chatId), {
    onError(error) {
      handleError(error);
    }
  });
};
