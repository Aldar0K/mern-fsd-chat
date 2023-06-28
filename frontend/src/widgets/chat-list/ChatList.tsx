import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Spinner, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

import { chatModel } from 'entities/chat';
import { getSender } from 'entities/user';
import { viewerModel } from 'entities/viewer';
import { AddGroupModal } from 'features/group';
import { ROUTES } from 'shared/const';

const selector = (state: chatModel.ChatState) => ({
  selectedChat: state.selectedChat,
  setSelectedChat: state.setSelectedChat
});

const ChatList: FC = () => {
  const viewer = viewerModel.useViewer();
  const { selectedChat, setSelectedChat } = chatModel.useChatStore(selector, shallow);
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
                  <NavLink key={chat._id} to={`${ROUTES.CHATS}/${chat._id}`}>
                    {({ isActive }) => (
                      <Box
                        px='2'
                        py='2'
                        borderRadius='lg'
                        bg={isActive ? '#38B2AC' : '#E8E8E8'}
                        color={isActive ? 'white' : 'black'}
                        cursor='pointer'
                        onClick={() => setSelectedChat(chat)}
                      >
                        <Text>
                          {chat.isGroupChat ? chat.chatName : getSender(viewer, chat.users)}
                        </Text>

                        {chat.latestMessage && (
                          <Text fontSize='small'>
                            {chat.latestMessage.sender.name}: {chat.latestMessage.content}
                          </Text>
                        )}
                      </Box>
                    )}
                  </NavLink>
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
