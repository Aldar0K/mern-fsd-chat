import { Avatar } from '@chakra-ui/avatar';
import { Box, Text } from '@chakra-ui/layout';
import { FC } from 'react';

import { userModel } from 'entities/user';

interface UserListItemProps {
  user: userModel.User;
  handleClick: () => void;
}

const UserListItem: FC<UserListItemProps> = ({ user, handleClick }) => {
  return (
    <Box
      display='flex'
      w='100%'
      px={3}
      py={2}
      cursor='pointer'
      bg='#E8E8E8'
      _hover={{
        background: '#38B2AC',
        color: 'white'
      }}
      alignItems='center'
      color='black'
      borderRadius='lg'
      onClick={handleClick}
    >
      <Avatar mr={2} size='sm' cursor='pointer' name={user?.name} src={user?.image} />
      <Box>
        <Text>{user?.name}</Text>
        <Text fontSize='xs'>
          <b>Email : </b>
          {user?.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
