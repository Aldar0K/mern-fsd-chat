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
import { FC, useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

import { apiUser } from 'api';
import { useCreateGroup, useDebounce, useHandleError, useNotify, useToggle } from 'hooks';
import { User } from 'models';
import { ChatState, useChatStore } from 'store';

import { UserBadgeItem, UserListItem } from 'components';

const selector = (state: ChatState) => ({
  chats: state.chats,
  setChats: state.setChats
});

interface AddGroupModalProps {
  children: JSX.Element;
}

const AddGroupModal: FC<AddGroupModalProps> = ({ children }) => {
  const { chats, setChats } = useChatStore(selector, shallow);
  const notify = useNotify();
  const handleError = useHandleError();
  const { mutateAsync: createGroupMutate, isLoading: createGroupLoading } = useCreateGroup();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
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

  // TODO implement react-hook-form.
  // TODO add form for enter key register.
  const handleSearch = async (searchValue: string) => {
    try {
      toggleLoading();
      const results = await apiUser.searchUser(searchValue);
      setSearchResults(results);
      toggleLoading();
    } catch (error) {
      handleError(error);
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers.length) {
      notify({ text: 'Please fill all the feilds', type: 'error' });
      return;
    }

    const newGroup = await createGroupMutate({
      name: groupChatName,
      users: JSON.stringify(selectedUsers.map(user => user._id))
    });
    setChats([newGroup, ...chats]);
    onClose();
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
                mb={3}
                placeholder='Start entering the user name...'
                onChange={e => setValue(e.target.value)}
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
            <Button colorScheme='blue' onClick={handleSubmit} isLoading={createGroupLoading}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddGroupModal;
