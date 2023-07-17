import { Button } from '@chakra-ui/react';
import { FC } from 'react';

import { viewerModel } from 'entities/viewer';
import { useLeaveGroup } from '../model';

interface LeaveGroupButtonProps {
  chatId: string;
}

const LeaveGroupButton: FC<LeaveGroupButtonProps> = ({ chatId }) => {
  const viewer = viewerModel.useViewer();
  const { mutateAsync: leaveGroupMutate, isLoading: leaveGroupLoading } = useLeaveGroup();

  const leaveGroup = () => {
    if (!viewer) return;
    leaveGroupMutate({ chatId, userId: viewer._id });
  };

  if (!viewer) return null;

  return (
    <Button onClick={leaveGroup} colorScheme='red' disabled={leaveGroupLoading}>
      Leave Group
    </Button>
  );
};

export default LeaveGroupButton;
