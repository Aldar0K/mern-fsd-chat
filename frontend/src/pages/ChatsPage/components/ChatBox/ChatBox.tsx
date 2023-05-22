import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, FormControl, IconButton, Input, Spinner, Text } from '@chakra-ui/react';
import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

import { useGetMessagesQuery, useSendMessage } from 'hooks';
import { ChatState, useChatStore, useUserStore } from 'store';
import { getSender, getSenderFull } from 'utils';

import { ProfileModal, UpdateGroupModal } from 'components';
import { ScrollableChat } from '..';

type Params = { chatId: string };

const selector = (state: ChatState) => ({
  chats: state.chats,
  selectedChat: state.selectedChat,
  setSelectedChat: state.setSelectedChat
});

const ChatBox: FC = () => {
  const user = useUserStore(state => state.user);
  const { chats, selectedChat, setSelectedChat } = useChatStore(selector, shallow);
  const { chatId } = useParams<keyof Params>() as Params;
  const { data: messages, isLoading: messagesLoading } = useGetMessagesQuery(chatId);
  const { mutateAsync: sendMessageMutate, isLoading: sendMessageLoading } = useSendMessage();

  useEffect(() => {
    const selectedChat = chats.find(chat => chat._id === chatId);
    selectedChat && setSelectedChat(selectedChat);
  }, [chats, chatId]);

  const sendMessage = async (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !!value.length) {
      const content = value;
      setValue('');

      const response = await sendMessageMutate({ chatId, content });
      console.log(response);
    }
  };

  const [value, setValue] = useState<string>('');
  const handleTyping = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    // TODO toggle typing state in the chat room (socket).
  };

  return (
    <Box
      display={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }}
      p={3}
      w={{ base: '100%', md: '68%' }}
      flexDir='column'
      alignItems='center'
      bg='white'
      borderRadius='lg'
      borderWidth='1px'
    >
      {selectedChat ? (
        <>
          <Text
            display='flex'
            pb={3}
            px={2}
            w='100%'
            justifyContent={{ base: 'space-between' }}
            alignItems='center'
            fontSize={{ base: '28px', md: '30px' }}
          >
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              aria-label=''
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat(null)}
            />
            {selectedChat.isGroupChat ? (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupModal />
              </>
            ) : (
              <>
                {user && (
                  <>
                    {getSender(user, selectedChat.users)}
                    <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                  </>
                )}
              </>
            )}
          </Text>

          <Box
            display='flex'
            h='100%'
            w='100%'
            p={3}
            flexDirection='column'
            bg='#E8E8E8'
            borderRadius='lg'
            overflowY='hidden'
          >
            <Box display='flex' mb={3} flex={1} justifyContent='center' alignItems='center'>
              {messagesLoading ? (
                <Spinner size='xl' w={20} h={20} />
              ) : (
                !!messages?.length && <ScrollableChat messages={messages} />
              )}
            </Box>

            <FormControl id='first-name' isRequired onKeyDown={sendMessage}>
              <Input
                variant='filled'
                bg='#E0E0E0'
                placeholder='Enter a message...'
                value={value}
                onChange={handleTyping}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box display='flex' h='100%' alignItems='center' justifyContent='center'>
          <Text pb={3} fontSize='3xl'>
            Click on a chat to start chatting
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ChatBox;
