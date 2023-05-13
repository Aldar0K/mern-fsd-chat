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
  useDisclosure
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { shallow } from 'zustand/shallow';

import { apiUser } from 'api';
import { useHandleError, useNotify, useToggle } from 'hooks';
import { User } from 'models';
import { ChatState, useChatStore, useUserStore } from 'store';

import { UserBadgeItem, UserListItem } from 'components';

const selector = (state: ChatState) => ({
  chat: state.chat,
  setChat: state.setChat,
  chats: state.chats,
  setChats: state.setChats
});

interface AddGroupModalProps {
  children: JSX.Element;
}

const AddGroupModal: FC<AddGroupModalProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chat, setChat, chats, setChats } = useChatStore(selector, shallow);
  const notify = useNotify();
  const { user } = useUserStore();
  const handleError = useHandleError();
  const [groupChatName, setGroupChatName] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isLoading, toggleLoading] = useToggle(false);

  const handleAddUser = (userToAdd: User) => {
    if (selectedUsers.includes(userToAdd)) {
      notify({ text: 'User already added', type: 'error' });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const removeUser = (userToRemove: User) => {
    setSelectedUsers(selectedUsers.filter(user => user._id !== userToRemove._id));
  };

  // TODO add useDebounce hook for search value.

  // TODO implement react-hook-form.
  // TODO add form for enter register.
  const handleSearch = async (searchValue: string) => {
    console.log('search users!', searchValue);

    if (!searchValue) {
      notify({ text: 'Please enter a value in the search field', type: 'warning' });
    }

    try {
      toggleLoading();

      const results = await apiUser.searchUser(searchValue);
      console.log(results);
      setSearchResults(results);

      toggleLoading();
    } catch (error) {
      handleError(error);
    }
  };

  const handleSubmit = async () => {
    console.log(groupChatName, selectedUsers);
    // TODO add api method for creating group chat.
  };

  return (
    <>
      {children ? (
        <div onClick={onOpen}>{children}</div>
      ) : (
        <IconButton
          display={{ base: 'flex' }}
          icon={<ViewIcon />}
          onClick={onOpen}
          aria-label={''}
        />
      )}

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display='flex' justifyContent='center' fontSize='35px'>
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display='flex' flexDir='column' alignItems='center'>
            <FormControl>
              <Input
                mb={3}
                placeholder='Chat Name'
                onChange={e => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                mb={1}
                placeholder='Start entering the user name...'
                onChange={e => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box display='flex' w='100%' flexWrap='wrap'>
              {selectedUsers.map(user => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  adminId={''}
                  handleClick={() => removeUser(user)}
                />
              ))}
            </Box>
            {isLoading ? (
              // <ChatLoading />
              <div>Loading...</div>
            ) : (
              searchResults
                ?.slice(0, 4)
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
            <Button onClick={handleSubmit} colorScheme='blue'>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddGroupModal;
