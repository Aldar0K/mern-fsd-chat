import { ViewIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { FC } from 'react';
import { shallow } from 'zustand/shallow';

import { chatModel } from 'entities/chat';
import { User, UserBadgeItem } from 'entities/user';
import { viewerModel } from 'entities/viewer';
import { AddUserForm, RenameGroupForm } from 'features/group';
import { useNotify } from 'shared/lib/hooks';

const selector = (state: chatModel.ChatState) => ({
  selectedChat: state.selectedChat,
  setSelectedChat: state.setSelectedChat
});

const UpdateGroupModal: FC = () => {
  const notify = useNotify();
  const viewer = viewerModel.useViewer();
  const { selectedChat, setSelectedChat } = chatModel.useChatStore(selector, shallow);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutateAsync: removeUserMutate, isLoading: removeUserLoading } = chatModel.useRemoveUser();

  const handleRemoveUser = async (userToRemove: User) => {
    if (!selectedChat || !viewer) return;
    if (selectedChat.groupAdmin?._id !== viewer._id) {
      notify({ text: 'Only administrators can remove someone from the group', type: 'error' });
      return;
    }

    const updatedChat = await removeUserMutate({
      chatId: selectedChat._id,
      userId: userToRemove._id
    });
    userToRemove._id === viewer._id ? setSelectedChat(null) : setSelectedChat(updatedChat);
  };

  return (
    <>
      {selectedChat && viewer && (
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
                <RenameGroupForm className='mb-3' />
                <AddUserForm />
              </ModalBody>

              <ModalFooter>
                <Button
                  onClick={() => handleRemoveUser(viewer)}
                  colorScheme='red'
                  disabled={removeUserLoading}
                >
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
