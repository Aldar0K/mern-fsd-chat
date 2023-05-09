import { Avatar, Box, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { useChat } from 'hooks/useChat';
import { User } from 'models';

interface UserCardProps {
  user: User;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  const { accessChat, isLoading } = useChat();

  const handleClick = () => {
    console.log('show or create a chat');
    accessChat(user._id);
  };

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
      userSelect='none'
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
