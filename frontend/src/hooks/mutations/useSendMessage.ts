import { useMutation } from 'react-query';

import { SendMessageDto, apiMessage } from 'api';
import { useHandleError, useInvalidate } from 'hooks';

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
