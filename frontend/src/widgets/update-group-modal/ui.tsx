import { ViewIcon } from '@chakra-ui/icons';
import {
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

import { chatModel } from 'entities/chat';
import { AddUserForm, GroupUsers, LeaveGroupButton, RenameGroupForm } from 'features/group';

const UpdateGroupModal: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectedChat = chatModel.useChatStore(state => state.selectedChat);

  if (!selectedChat) return null;

  return (
    <>
      <IconButton display={{ base: 'flex' }} icon={<ViewIcon />} onClick={onOpen} aria-label={''} />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader display='flex' justifyContent='center' fontSize='35px'>
            {selectedChat.chatName}
          </ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <GroupUsers />
            <RenameGroupForm className='mb-3' />
            <AddUserForm />
          </ModalBody>

          <ModalFooter>
            <LeaveGroupButton />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupModal;
