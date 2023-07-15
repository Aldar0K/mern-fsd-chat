import { Button } from '@chakra-ui/react';
import { FC } from 'react';
import { shallow } from 'zustand/shallow';

import { chatModel } from 'entities/chat';
import { viewerModel } from 'entities/viewer';
import { useRemoveUser } from '../model';

const selector = (state: chatModel.ChatState) => ({
  selectedChat: state.selectedChat,
  setSelectedChat: state.setSelectedChat
});

const LeaveGroupButton: FC = () => {
  const viewer = viewerModel.useViewer();
  const { selectedChat, setSelectedChat } = chatModel.useChatStore(selector, shallow);
  const { mutateAsync: removeUserMutate, isLoading: removeUserLoading } = useRemoveUser();

  const leaveGroup = () => {
    if (!selectedChat || !viewer) return;

    removeUserMutate(
      {
        chatId: selectedChat._id,
        userId: viewer._id
      },
      {
        onSuccess() {
          setSelectedChat(null);
        }
      }
    );
  };

  if (!viewer) return null;

  return (
    <Button onClick={leaveGroup} colorScheme='red' disabled={removeUserLoading}>
      Leave Group
    </Button>
  );
};

export default LeaveGroupButton;
