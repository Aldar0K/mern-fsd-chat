import { useDisclosure } from '@chakra-ui/hooks';
import { ViewIcon } from '@chakra-ui/icons';
import {
  Button,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import { User } from 'models';
import { FC } from 'react';

interface ProfileModalProps {
  user: User;
  children: JSX.Element;
}

const ProfileModal: FC<ProfileModalProps> = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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

      <Modal isOpen={isOpen} onClose={onClose} size='lg' isCentered>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader display='flex' fontSize='40px' justifyContent='center'>
            {user.name}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody display='flex' flexDirection='column' alignItems='center' gap='20px'>
            <Image src={user.image} alt={user.name} borderRadius='full' boxSize='150px' />

            <Text fontSize={{ base: '28px', md: '30px' }}>Email: {user.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
