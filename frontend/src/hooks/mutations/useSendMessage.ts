import { useMutation } from 'react-query';

import { useHandleError, useInvalidate } from 'hooks';
import { SendMessageDto, apiMessage } from 'shared/api';

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
