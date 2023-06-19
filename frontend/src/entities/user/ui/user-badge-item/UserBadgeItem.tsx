import { CloseIcon } from '@chakra-ui/icons';
import { Badge } from '@chakra-ui/layout';
import { FC } from 'react';

import { User } from 'entities/user';

interface UserBadgeItemProps {
  user: User;
  isAdmin?: boolean;
  handleClick: () => void;
  loading?: boolean;
}

const UserBadgeItem: FC<UserBadgeItemProps> = ({ user, isAdmin, handleClick, loading }) => {
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
      onClick={() => !loading && handleClick()}
    >
      {user.name}
      {isAdmin && <span> (Admin)</span>}
      <CloseIcon pl={1} />
    </Badge>
  );
};

export default UserBadgeItem;
