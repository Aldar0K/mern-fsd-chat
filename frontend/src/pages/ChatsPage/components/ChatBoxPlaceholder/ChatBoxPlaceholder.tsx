import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';

const ChatBox: FC = () => {
  return (
    <Box
      display='flex'
      p={3}
      w={{ base: '100%', md: '68%' }}
      flexDir='column'
      alignItems='center'
      bg='white'
      borderRadius='lg'
      borderWidth='1px'
    >
      <Box display='flex' h='100%' alignItems='center' justifyContent='center'>
        <Text pb={3} fontSize='3xl'>
          Click on a chat to start chatting
        </Text>
      </Box>
    </Box>
  );
};

export default ChatBox;
