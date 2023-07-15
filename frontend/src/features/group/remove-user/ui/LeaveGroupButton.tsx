import { Button } from '@chakra-ui/react';
import { FC } from 'react';

import { chatModel } from 'entities/chat';
import { viewerModel } from 'entities/viewer';
import { useLeaveGroup } from '../model';

const LeaveGroupButton: FC = () => {
  const viewer = viewerModel.useViewer();
  const selectedChat = chatModel.useChatStore(state => state.selectedChat);
  const { mutateAsync: leaveGroupMutate, isLoading: leaveGroupLoading } = useLeaveGroup();

  const leaveGroup = () => {
    if (!selectedChat || !viewer) return;
    leaveGroupMutate({ chatId: selectedChat._id, userId: viewer._id });
  };

  if (!viewer) return null;

  return (
    <Button onClick={leaveGroup} colorScheme='red' disabled={leaveGroupLoading}>
      Leave Group
    </Button>
  );
};

export default LeaveGroupButton;
