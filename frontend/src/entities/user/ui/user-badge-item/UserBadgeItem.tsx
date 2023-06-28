import { CloseIcon } from '@chakra-ui/icons';
import { Badge } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/react';
import { FC } from 'react';

import { userModel } from 'entities/user';

interface UserBadgeItemProps {
  user: userModel.User;
  isAdmin?: boolean;
  handleClick: () => void;
  loading?: boolean;
}

const UserBadgeItem: FC<UserBadgeItemProps> = ({ user, isAdmin, handleClick, loading }) => {
  return (
    <Badge
      display='flex'
      alignItems='center'
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
      {loading ? <Spinner size='xs' /> : <CloseIcon pl={1} />}
    </Badge>
  );
};

export default UserBadgeItem;
