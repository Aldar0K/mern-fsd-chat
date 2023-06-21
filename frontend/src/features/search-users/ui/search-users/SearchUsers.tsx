import { useDisclosure } from '@chakra-ui/hooks';
import { SearchIcon } from '@chakra-ui/icons';
import { Button, Text, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';

import { SearchUsersDrawer } from '../search-users-drawer';

const SearchUsers: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip label='Search users in the chats' hasArrow placeContent='bottom-end'>
        <Button variant='ghost' onClick={onOpen}>
          <SearchIcon />
          <Text display={{ base: 'none', md: 'flex' }} px={4}>
            Search users
          </Text>
        </Button>
      </Tooltip>

      <SearchUsersDrawer placement='left' onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default SearchUsers;
