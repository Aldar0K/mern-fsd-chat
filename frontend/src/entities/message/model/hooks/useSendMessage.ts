import { useMutation } from 'react-query';

import { messageApi } from 'entities/message';
import { useHandleError, useInvalidate } from 'shared/lib/hooks';

export const useSendMessage = () => {
  const handleError = useHandleError();
  const invalidate = useInvalidate();

  return useMutation(
    (data: messageApi.SendMessageDto) => {
      return messageApi.sendMessage(data);
    },
    {
      onSuccess(_, variables) {
        invalidate(`/message/${variables.chatId}`);
      },
      onError(error) {
        handleError(error);
      }
    }
  );
};
