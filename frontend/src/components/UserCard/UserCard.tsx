import { Avatar, Box, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { User } from 'models';

interface UserCardProps {
  user: User;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  const handleClick = () => console.log('click');

  return (
    <Box
      onClick={handleClick}
      display='flex'
      px={3}
      py={2}
      w='100%'
      bg='#E8E8E8'
      alignItems='center'
      borderRadius='lg'
      color='black'
      cursor='pointer'
      transition='all .2s ease'
      _hover={{
        background: '#38B2AC',
        color: 'white'
      }}
    >
      <Avatar mr={2} size='sm' cursor='pointer' name={user.name} src={user.image} />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize='xs'>
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserCard;
