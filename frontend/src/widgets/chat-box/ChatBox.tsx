import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, FormControl, IconButton, Input, Spinner, Text } from '@chakra-ui/react';
import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { useParams } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

import { ScrollableChat, chatModel } from 'entities/chat';
import { messageModel } from 'entities/message';
import { UserProfileModal, userLib } from 'entities/user';
import { viewerModel } from 'entities/viewer';
import animationData from 'shared/animations/typing.json';
import { UpdateGroupModal } from 'widgets/update-group-modal';
import { useChatSocket } from './model';

type Params = { chatId: string };

const selector = (state: chatModel.ChatState) => ({
  selectedChat: state.selectedChat,
  setSelectedChat: state.setSelectedChat
});

const ChatBox: FC = () => {
  const viewer = viewerModel.useViewer();
  const { selectedChat, setSelectedChat } = chatModel.useChatStore(selector, shallow);
  const { data: chats } = chatModel.useChats();
  const { chatId } = useParams<keyof Params>() as Params;
  const [currentMessages, setCurrentMessages] = useState<messageModel.Message[]>([]);
  const { data: messages, isLoading: messagesLoading } = messageModel.useGetMessagesQuery(chatId);
  const [value, setValue] = useState<string>('');
  const { otherTyping, sendMessage, toggleTyping } = useChatSocket({
    chatId,
    setCurrentMessages
  });

  useEffect(() => {
    messages && setCurrentMessages(messages);
  }, [messages]);

  useEffect(() => {
    const selectedChat = chats?.find(chat => chat._id === chatId);
    selectedChat && setSelectedChat(selectedChat);
  }, [chats, chatId]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !!value.length) {
      sendMessage(value);
      setValue('');
    }
  };

  const handleTyping = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    toggleTyping();
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
              aria-label={''}
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
                {viewer && (
                  <>
                    {userLib.getSender(viewer, selectedChat.users)}
                    <UserProfileModal user={userLib.getSenderFull(viewer, selectedChat.users)} />
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
            justifyContent='flex-end'
            gap={2}
            bg='#E8E8E8'
            borderRadius='lg'
            overflow='hidden'
          >
            {messagesLoading ? (
              <Spinner size='xl' margin='auto' w={20} h={20} alignSelf='center' />
            ) : currentMessages.length ? (
              <div className='flex-auto'>
                <ScrollableChat messages={currentMessages} />
              </div>
            ) : (
              <div className='flex flex-auto justify-center items-center'>
                <h2>No messages yet. Start your communication, send a message!</h2>
              </div>
            )}

            <FormControl id='first-name' isRequired onKeyDown={handleKeyDown}>
              {otherTyping && (
                <div>
                  <Lottie
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData,
                      rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice'
                      }
                    }}
                    width={60}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              )}
              <Input
                key={chatId}
                autoFocus
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
