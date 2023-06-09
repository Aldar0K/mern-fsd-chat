import { ViewIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { shallow } from 'zustand/shallow';

import { useAddUser, useNotify, useRemoveUser, useRenameChat, useSearchUsers } from 'hooks';
import { User } from 'models';
import { ChatState, useChatStore, useUserStore } from 'store';

import { ChatsLoader, UserBadgeItem, UserListItem } from 'components';

const selector = (state: ChatState) => ({
  selectedChat: state.selectedChat,
  setSelectedChat: state.setSelectedChat
});

const UpdateGroupModal: FC = () => {
  const notify = useNotify();
  const user = useUserStore(state => state.user);
  const { selectedChat, setSelectedChat } = useChatStore(selector, shallow);
  const [groupChatName, setGroupChatName] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutateAsync: renameChatMutate, isLoading: renameChatLoading } = useRenameChat();
  const { mutateAsync: addUserMutate, isLoading: addUserLoading } = useAddUser();
  const { mutateAsync: removeUserMutate, isLoading: removeUserLoading } = useRemoveUser();
  const [value, setValue, searchResults, searchLoading] = useSearchUsers();

  const handleRename = async () => {
    if (!selectedChat) return;
    if (!groupChatName) {
      notify({ text: 'Please enter a group name', type: 'warning' });
      return;
    }
    if (groupChatName === selectedChat.chatName) {
      notify({ text: 'Please enter a new group name', type: 'warning' });
      return;
    }

    const updatedChat = await renameChatMutate({
      chatId: selectedChat._id,
      chatName: groupChatName
    });
    setSelectedChat(updatedChat);
  };

  const handleAddUser = async (userToAdd: User) => {
    if (!selectedChat || !user) return;
    if (selectedChat.users.find(user => user._id === userToAdd._id)) {
      notify({ text: 'User already in the group', type: 'error' });
      return;
    }
    if (selectedChat.groupAdmin?._id !== user._id) {
      notify({ text: 'Only administrators can add someone to the group', type: 'error' });
      return;
    }

    const updatedChat = await addUserMutate({ chatId: selectedChat._id, userId: userToAdd._id });
    setSelectedChat(updatedChat);
  };

  const handleRemoveUser = async (userToRemove: User) => {
    if (!selectedChat || !user) return;
    if (selectedChat.groupAdmin?._id !== user._id) {
      notify({ text: 'Only administrators can remove someone from the group', type: 'error' });
      return;
    }

    const updatedChat = await removeUserMutate({
      chatId: selectedChat._id,
      userId: userToRemove._id
    });
    userToRemove._id === user._id ? setSelectedChat(null) : setSelectedChat(updatedChat);
  };

  return (
    <>
      {selectedChat && user && (
        <>
          <IconButton
            display={{ base: 'flex' }}
            icon={<ViewIcon />}
            onClick={onOpen}
            aria-label={''}
          />

          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader display='flex' justifyContent='center' fontSize='35px'>
                {selectedChat.chatName}
              </ModalHeader>

              <ModalCloseButton />

              <ModalBody>
                <Box w='100%' display='flex' flexWrap='wrap' pb={3}>
                  {selectedChat.users.map(user => (
                    <UserBadgeItem
                      key={user._id}
                      user={user}
                      isAdmin={selectedChat.groupAdmin?._id === user._id}
                      handleClick={() => handleRemoveUser(user)}
                    />
                  ))}
                </Box>
                <FormControl display='flex'>
                  <Input
                    placeholder='Chat Name'
                    mr={2}
                    mb={3}
                    value={groupChatName}
                    onChange={e => setGroupChatName(e.target.value)}
                  />
                  <Button
                    variant='solid'
                    colorScheme='teal'
                    isLoading={renameChatLoading}
                    onClick={handleRename}
                  >
                    Update
                  </Button>
                </FormControl>
                <FormControl>
                  <Input
                    mb={3}
                    placeholder='Add user to group...'
                    value={value}
                    onChange={e => setValue(e.target.value)}
                  />
                </FormControl>

                {searchLoading || addUserLoading || removeUserLoading ? (
                  <ChatsLoader amount={4} />
                ) : (
                  <Stack>
                    {!!searchResults?.length &&
                      searchResults
                        .slice(0, 4)
                        .map(user => (
                          <UserListItem
                            key={user._id}
                            user={user}
                            handleClick={() => handleAddUser(user)}
                          />
                        ))}
                  </Stack>
                )}
              </ModalBody>

              <ModalFooter>
                <Button onClick={() => handleRemoveUser(user)} colorScheme='red'>
                  Leave Group
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default UpdateGroupModal;
