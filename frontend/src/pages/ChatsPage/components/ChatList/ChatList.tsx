import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { shallow } from 'zustand/shallow';

import { useChats } from 'hooks';
import { User } from 'models';
import { ChatState, useChatStore, useUserStore } from 'store';
import { getSender } from 'utils';

import { AddGroupModal } from 'components';

const selector = (state: ChatState) => ({
  selectedChat: state.selectedChat,
  setSelectedChat: state.setSelectedChat,
  chats: state.chats,
  setChats: state.setChats
});

const ChatList: FC = () => {
  const user = useUserStore(state => state.user) as User;
  const { selectedChat, setSelectedChat, chats, setChats } = useChatStore(selector, shallow);

  const { data: chatsData, isLoading: chatsLoading } = useChats();
  useEffect(() => {
    if (chatsData) setChats(chatsData);
  }, [chatsData]);

  return (
    <Box
      display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
      flexDir='column'
      alignItems='center'
      p='3'
      bg='white'
      w={{ base: '100%', md: '31%' }}
      borderRadius='lg'
      borderWidth='1px'
    >
      <Box
        display='flex'
        w='100%'
        pb='3'
        px='3'
        justifyContent='space-between'
        alignItems='center'
        fontSize={{ base: '28px', md: '30px' }}
      >
        Chats
        <AddGroupModal>
          <Button
            display='flex'
            fontSize={{ base: '17px', md: '10px', lg: '17px' }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </AddGroupModal>
      </Box>

      <Box
        display='flex'
        flexDir='column'
        w='100%'
        h='100%'
        bg='#F8F8F8'
        p='3'
        borderRadius='lg'
        overflowY='hidden'
      >
        {chatsLoading ? (
          // <ChatsLoading />
          <h2>ChatsLoading</h2>
        ) : (
          <>
            {chats ? (
              <Stack overflowY='auto'>
                {chats.map(chat => (
                  <Box
                    key={chat._id}
                    px='2'
                    py='2'
                    borderRadius='lg'
                    bg={selectedChat === chat ? '#38B2AC' : '#E8E8E8'}
                    color={selectedChat === chat ? 'white' : 'black'}
                    cursor='pointer'
                    onClick={() => setSelectedChat(chat)}
                  >
                    <Text>{chat.isGroupChat ? chat.chatName : getSender(user, chat.users)}</Text>
                  </Box>
                ))}
              </Stack>
            ) : (
              <h2>No chats</h2>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ChatList;
