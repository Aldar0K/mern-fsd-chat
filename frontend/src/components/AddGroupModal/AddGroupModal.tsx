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
  Stack,
  useDisclosure
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { shallow } from 'zustand/shallow';

import { User, useSearchUsers } from 'entities/User';
import { useCreateGroup, useNotify } from 'hooks';
import { ChatState, useChatStore } from 'store';

import { UserBadgeItem, UserListItem } from 'components';

const selector = (state: ChatState) => ({
  chats: state.chats,
  setChats: state.setChats,
  setSelectedChat: state.setSelectedChat
});

interface AddGroupModalProps {
  children: JSX.Element;
}

const AddGroupModal: FC<AddGroupModalProps> = ({ children }) => {
  const { chats, setChats, setSelectedChat } = useChatStore(selector, shallow);
  const notify = useNotify();
  const { mutateAsync: createGroupMutate, isLoading: createGroupLoading } = useCreateGroup();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [value, setValue, searchResults, searchLoading] = useSearchUsers();

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
    setSelectedChat(newGroup);
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

          <ModalBody>
            <FormControl>
              <Input
                mb={3}
                placeholder='Chat Name'
                value={groupChatName}
                onChange={e => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                mb={3}
                placeholder='Start entering the user name...'
                value={value}
                onChange={e => setValue(e.target.value)}
              />
            </FormControl>
            <Box display='flex' w='100%' flexWrap='wrap'>
              {selectedUsers.map(user => (
                <UserBadgeItem key={user._id} user={user} handleClick={() => removeUser(user)} />
              ))}
            </Box>
            {searchLoading ? (
              <Spinner size='md' />
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
