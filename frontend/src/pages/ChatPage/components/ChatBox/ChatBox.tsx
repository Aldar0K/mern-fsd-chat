import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { shallow } from 'zustand/shallow';

import { ChatState, useChatStore, useUserStore } from 'store';
import { getSender, getSenderFull } from 'utils';

import { ProfileModal, UpdateGroupModal } from 'components';

const selector = (state: ChatState) => ({
  selectedChat: state.selectedChat,
  setSelectedChat: state.setSelectedChat
});

const ChatBox: FC = () => {
  const user = useUserStore(state => state.user);
  const { selectedChat, setSelectedChat } = useChatStore(selector, shallow);

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
            flexDir='column'
            justifyContent='flex-end'
            bg='#E8E8E8'
            borderRadius='lg'
            overflowY='hidden'
          >
            {/* {loading ? (
              <Spinner size='xl' w={20} h={20} alignSelf='center' margin='auto' />
            ) : (
              <div className='messages'>
                <ScrollableChat messages={messages} />
              </div>
            )} */}

            {/* <FormControl onKeyDown={sendMessage} id='first-name' isRequired mt={3}>
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <Input
                variant='filled'
                bg='#E0E0E0'
                placeholder='Enter a message..'
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl> */}
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
