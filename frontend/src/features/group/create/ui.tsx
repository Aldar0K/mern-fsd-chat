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
import { useNavigate } from 'react-router';

import { User, UserBadgeItem, UserListItem, userModel } from 'entities/user';
import { ROUTES } from 'shared/const';
import { useNotify } from 'shared/lib/hooks';
import { useCreateGroup } from './model';

interface AddGroupModalProps {
  children: JSX.Element;
}

const AddGroupModal: FC<AddGroupModalProps> = ({ children }) => {
  const notify = useNotify();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const { mutateAsync: createGroupMutate, isLoading: createGroupLoading } = useCreateGroup();
  const [value, setValue, searchResults, searchLoading] = userModel.useSearchUsers();

  const handleAddUser = (userToAdd: User) => {
    if (selectedUsers.includes(userToAdd)) {
      notify({ text: 'User already added', type: 'error' });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleRemoveUser = (userToRemove: User) => {
    setSelectedUsers(selectedUsers.filter(user => user._id !== userToRemove._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName) {
      notify({ text: 'Please fill all the feilds', type: 'error' });
      return;
    }
    if (selectedUsers.length < 2) {
      notify({ text: 'Add at least two group members', type: 'error' });
      return;
    }

    createGroupMutate(
      {
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map(user => user._id))
      },
      {
        onSuccess: data => {
          navigate(`${ROUTES.CHATS}/${data._id}`);
          onClose();
        }
      }
    );
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
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  handleClick={() => handleRemoveUser(user)}
                />
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
