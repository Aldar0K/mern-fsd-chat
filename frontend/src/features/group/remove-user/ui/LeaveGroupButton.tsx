import { Button } from '@chakra-ui/react';
import { FC } from 'react';
import { shallow } from 'zustand/shallow';

import { chatModel } from 'entities/chat';
import { userModel } from 'entities/user';
import { viewerModel } from 'entities/viewer';
import { useNotify } from 'shared/lib/hooks';
import { useRemoveUser } from '../model';

const selector = (state: chatModel.ChatState) => ({
  selectedChat: state.selectedChat,
  setSelectedChat: state.setSelectedChat
});

const LeaveGroupButton: FC = () => {
  const notify = useNotify();
  const viewer = viewerModel.useViewer();
  const { selectedChat, setSelectedChat } = chatModel.useChatStore(selector, shallow);
  const { mutateAsync: removeUserMutate, isLoading: removeUserLoading } = useRemoveUser();

  const handleRemoveUser = async (userToRemove: userModel.User) => {
    if (!selectedChat || !viewer) return;
    if (selectedChat.groupAdmin?._id !== viewer._id) {
      notify({ text: 'Only administrators can remove someone from the group', type: 'error' });
      return;
    }

    removeUserMutate(
      {
        chatId: selectedChat._id,
        userId: userToRemove._id
      },
      {
        onSuccess(updatedChat) {
          userToRemove._id === viewer._id ? setSelectedChat(null) : setSelectedChat(updatedChat);
        }
      }
    );
  };

  if (!viewer) return null;

  return (
    <Button onClick={() => handleRemoveUser(viewer)} colorScheme='red' disabled={removeUserLoading}>
      Leave Group
    </Button>
  );
};

export default LeaveGroupButton;
