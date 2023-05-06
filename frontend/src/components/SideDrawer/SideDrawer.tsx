import { BellIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip
} from '@chakra-ui/react';
import { FC, useState } from 'react';

import { useAuth, useToggle } from 'hooks';
import { useUserStore } from 'store';

import { ProfileModal } from 'components';

const SideDrawer: FC = () => {
  const user = useUserStore(state => state.user);
  const { logout } = useAuth();
  const [search, setSearch] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, toggleLoading] = useToggle(false);
  const [chatLoading, toggleChatLoading] = useToggle(false);

  return (
    <>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        bg='white'
        w='100%'
        p='5px 10px'
        borderWidth='5px'
      >
        <Tooltip label='Search users in the chats' hasArrow placeContent='bottom-end'>
          <Button variant='ghost'>
            <SearchIcon />
            <Text display={{ base: 'none', md: 'flex' }} px={4}>
              Search users
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize='2xl'>Chat App</Text>

        <div>
          <Menu>
            <MenuButton px={2}>
              <BellIcon fontSize='2xl' m={1} />
            </MenuButton>
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} px={2}>
              <Avatar src={user?.image} name={user?.name} size='sm' cursor='pointer' />
            </MenuButton>
            <MenuList>
              {user && (
                <ProfileModal user={user}>
                  <MenuItem>My profile</MenuItem>
                </ProfileModal>
              )}
              <MenuDivider />
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
};

export default SideDrawer;
