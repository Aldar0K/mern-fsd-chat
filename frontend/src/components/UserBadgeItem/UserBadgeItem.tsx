import { CloseIcon } from '@chakra-ui/icons';
import { Badge } from '@chakra-ui/layout';
import { FC } from 'react';

import { User } from 'models';

interface UserBadgeItemProps {
  user: User;
  isAdmin?: boolean;
  handleClick: () => void;
}

const UserBadgeItem: FC<UserBadgeItemProps> = ({ user, isAdmin, handleClick }) => {
  return (
    <Badge
      m={1}
      mb={2}
      px={2}
      py={1}
      borderRadius='lg'
      variant='solid'
      fontSize={12}
      colorScheme='purple'
      cursor='pointer'
      onClick={handleClick}
    >
      {user.name}
      {isAdmin && <span> (Admin)</span>}
      <CloseIcon pl={1} />
    </Badge>
  );
};

export default UserBadgeItem;
