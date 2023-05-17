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
  Spinner,
  useDisclosure
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

import { apiUser } from 'api';
import { useDebounce, useHandleError, useNotify, useToggle } from 'hooks';
import { User } from 'models';
import { ChatState, useChatStore, useUserStore } from 'store';

import { UserBadgeItem, UserListItem } from 'components';
import { useRenameChat } from 'hooks/mutations/useRenameChat';

const selector = (state: ChatState) => ({
  selectedChat: state.selectedChat,
  setSelectedChat: state.setSelectedChat
});

const UpdateGroupModal: FC = () => {
  const notify = useNotify();
  const handleError = useHandleError();
  const user = useUserStore(state => state.user);
  const { selectedChat, setSelectedChat } = useChatStore(selector, shallow);
  const [groupChatName, setGroupChatName] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchLoading, toggleSearchLoading] = useToggle(false);
  const { mutateAsync: renameChatMutate, isLoading: renameChatLoading } = useRenameChat();

  const [value, setValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');

  const debouncedSearchValue = useDebounce<string>(value, 500);
  useEffect(() => {
    setSearchValue(value);
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (searchValue) {
      handleSearch(searchValue);
    }
  }, [searchValue]);

  const handleSearch = async (searchValue: string) => {
    try {
      toggleSearchLoading();
      const results = await apiUser.searchUser(searchValue);
      setSearchResults(results);
      toggleSearchLoading();
    } catch (error) {
      handleError(error);
    }
  };

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

    const updateChat = await renameChatMutate({
      chatId: selectedChat._id,
      chatName: groupChatName
    });
    setSelectedChat(updateChat);
  };

  const handleAddUser = async (userToAdd: User) => {
    if (selectedChat) {
      if (selectedChat.users.find(user => user._id === userToAdd._id)) {
        notify({ text: 'The user is already in the group!', type: 'error' });
        return;
      }
    }
  };

  const handleRemoveUser = async (userToRemove: User) => {
    // if (selectedChat) {}
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
              <ModalBody display='flex' flexDir='column' alignItems='center'>
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
                    onChange={e => setValue(e.target.value)}
                  />
                </FormControl>

                {searchLoading ? (
                  <Spinner size='md' />
                ) : (
                  searchResults
                    .slice(0, 4)
                    .map(user => (
                      <UserListItem
                        key={user._id}
                        user={user}
                        handleClick={() => handleAddUser(user)}
                      />
                    ))
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
