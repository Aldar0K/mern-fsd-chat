import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Spinner, Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { ChatCard, chatModel } from 'entities/chat';
import { viewerModel } from 'entities/viewer';
import { AddGroupModal } from 'features/group';

const ChatList: FC = () => {
  const viewer = viewerModel.useViewer();
  const selectedChat = chatModel.useChatStore(state => state.selectedChat);
  const { data: chats, isLoading: chatsLoading } = chatModel.useChats();

  if (!viewer) return null;

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
            New Group
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
          <Spinner size='md' />
        ) : (
          <>
            {chats ? (
              <Stack overflowY='auto'>
                {chats.map(chat => (
                  <ChatCard key={chat._id} chat={chat} />
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
