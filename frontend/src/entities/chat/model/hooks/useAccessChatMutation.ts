import { useNavigate } from 'react-router';

import { chatApi } from 'entities/chat';
import { useMutation } from 'react-query';
import { ROUTES } from 'shared/const';
import { useHandleError, useInvalidate } from 'shared/lib/hooks';
import { useChatStore } from '../chat-store';

export const useAccessChatMutation = () => {
  const handleError = useHandleError();
  const navigate = useNavigate();
  const invalidate = useInvalidate();
  const setSelectedChat = useChatStore(state => state.setSelectedChat);

  return useMutation(
    (userId: string) => {
      return chatApi.accessChat(userId);
    },
    {
      onSuccess(data) {
        invalidate('/chats');
        setSelectedChat(data);
        navigate(`${ROUTES.CHATS}/${data._id}`);
      },
      onError(error) {
        handleError(error);
      }
    }
  );
};
