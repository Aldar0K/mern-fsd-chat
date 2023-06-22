import { Avatar, Box, Spinner, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { chatModel } from 'entities/chat';
import { User } from '../../model/types';

interface UserCardProps {
  user: User;
  onClose: () => void;
}

const UserCard: FC<UserCardProps> = ({ user, onClose }) => {
  const [accessChat, chatLoading] = chatModel.useAccessChat();

  const handleClick = async () => {
    await accessChat(user._id);
    onClose();
  };

  return (
    <Box
      display='flex'
      w='100%'
      px={3}
      py={2}
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
      onClick={handleClick}
    >
      <Avatar mr='2' size='sm' cursor='pointer' name={user.name} src={user.image} />
      <Box mr='auto'>
        <Text>{user.name}</Text>
        <Text fontSize='xs'>
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
      {chatLoading && <Spinner display='flex' />}
    </Box>
  );
};

export default UserCard;
