import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, FormControl, IconButton, Input, Spinner, Text } from '@chakra-ui/react';
import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { useParams } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';
import { shallow } from 'zustand/shallow';

import { Chat, ChatState, useChatStore } from 'entities/Chat';
import {
  Message,
  NotificationState,
  useGetMessagesQuery,
  useNotificationStore,
  useSendMessage
} from 'entities/Message';
import { User, getSender, getSenderFull } from 'entities/User';
import { viewerModel } from 'entities/viewer';
import animationData from 'shared/animations/typing.json';
import styles from './ChatBox.module.scss';

import { ProfileModal, UpdateGroupModal } from 'components';
import { ScrollableChat } from '..';

// TODO move to "types" or "interfaces".
interface ServerToClientEvents {
  connected: () => void;
  typing: () => void;
  stopTyping: () => void;
  messageRecieved: (newMessage: Message) => void;
}

interface ClientToServerEvents {
  setup: (user: User) => void;
  joinChat: (chatId: string) => void;
  newMessage: (newMessage: Message) => void;
  typing: (chatId: string) => void;
  stopTyping: (chatId: string) => void;
}

const ENDPONINT = 'http://localhost:8080';
let socket: Socket<ServerToClientEvents, ClientToServerEvents>,
  selectedChatCompare: Chat | undefined;

type Params = { chatId: string };

const selector = (state: ChatState) => ({
  chats: state.chats,
  selectedChat: state.selectedChat,
  setSelectedChat: state.setSelectedChat
});

const notificationSelector = (state: NotificationState) => ({
  notifications: state.notifications,
  addNotifications: state.addNotifications,
  clearNotifications: state.clearNotifications
});

const ChatBox: FC = () => {
  const viewer = viewerModel.useViewerStore(state => state.viewer);
  const { chats, selectedChat, setSelectedChat } = useChatStore(selector, shallow);
  const { notifications, addNotifications } = useNotificationStore(notificationSelector, shallow);
  const { chatId } = useParams<keyof Params>() as Params;
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const { data: messages, isLoading: messagesLoading } = useGetMessagesQuery(chatId);
  const { mutateAsync: sendMessageMutate } = useSendMessage();
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [typing, setTyping] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    socket = io(ENDPONINT);
    viewer && socket.emit('setup', viewer);
    socket.on('connected', () => setSocketConnected(true));

    socket.on('typing', () => setIsTyping(true));
    socket.on('stopTyping', () => setIsTyping(false));

    socket.on('messageRecieved', newMessage => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessage.chat._id) {
        if (!notifications.includes(newMessage)) {
          addNotifications([newMessage]);
        }
      } else {
        setCurrentMessages(prev => [...prev, newMessage]);
      }
    });
  }, []);

  useEffect(() => {
    if (!messages || !selectedChat) return;

    selectedChat && socket.emit('joinChat', selectedChat._id);
  }, [messages, selectedChat]);

  useEffect(() => {
    messages && setCurrentMessages(messages);
  }, [messages]);

  useEffect(() => {
    const selectedChat = chats.find(chat => chat._id === chatId);
    selectedChatCompare = selectedChat;
    selectedChat && setSelectedChat(selectedChat);
  }, [chats, chatId]);

  const sendMessage = async (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !!value.length) {
      selectedChat && socket.emit('stopTyping', selectedChat._id);

      const content = value;
      setValue('');

      const newMessage = await sendMessageMutate({ chatId, content });

      setCurrentMessages(prev => [...prev, newMessage]);
      socket.emit('newMessage', newMessage);
    }
  };

  const [value, setValue] = useState<string>('');
  const handleTyping = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    // TODO toggle typing state in the chat room (socket).
    if (!socketConnected || !selectedChat) return;

    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectedChat._id);
    }

    // TODO add more straight debounce logic.
    const lastTypingTime = new Date().getTime();
    const DEFAULT_TYPING_TIMEOUT = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= DEFAULT_TYPING_TIMEOUT && typing) {
        socket.emit('stopTyping', selectedChat._id);
        setTyping(false);
      }
    }, DEFAULT_TYPING_TIMEOUT);
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
                    {getSender(viewer, selectedChat.users)}
                    <ProfileModal user={getSenderFull(viewer, selectedChat.users)} />
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
            ) : (
              currentMessages.length && (
                <div className={styles.messages}>
                  <ScrollableChat messages={currentMessages} />
                </div>
              )
            )}

            <FormControl id='first-name' isRequired onKeyDown={sendMessage}>
              {isTyping && (
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
