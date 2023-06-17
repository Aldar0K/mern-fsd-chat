import { useMutation } from 'react-query';

import { SendMessageDto, apiMessage } from 'entities/message';
import { useHandleError, useInvalidate } from 'shared/lib/hooks';

export const useSendMessage = () => {
  const handleError = useHandleError();
  const invalidate = useInvalidate();

  return useMutation(
    (data: SendMessageDto) => {
      return apiMessage.sendMessage(data);
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
