import { useDisclosure } from '@chakra-ui/hooks';
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
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

import { ROUTES } from 'consts';
import { useAuth } from 'hooks';
import { NotificationState, useNotificationStore, useUserStore } from 'store';
import { getSender } from 'utils';

import { ProfileModal, SearchUserDrawer } from 'components';

const selector = (state: NotificationState) => ({
  notifications: state.notifications,
  removeNotification: state.removeNotification,
  clearNotifications: state.clearNotifications
});

const HeaderAuth: FC = () => {
  const { notifications, removeNotification } = useNotificationStore(selector, shallow);
  const user = useUserStore(state => state.user);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {user && (
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
              <Button variant='ghost' onClick={onOpen}>
                <SearchIcon />
                <Text display={{ base: 'none', md: 'flex' }} px={4}>
                  Search users
                </Text>
              </Button>
            </Tooltip>

            <Text fontSize='2xl'>Chat App</Text>

            <div>
              <Menu>
                <MenuButton p={1}>
                  {/* <NotificationBadge count={notifications.length} effect={Effect.SCALE} /> */}
                  <BellIcon fontSize='2xl' m={1} />
                </MenuButton>
                <MenuList pl={2}>
                  {!notifications.length && 'No new messages'}
                  {notifications.map(notification => (
                    <MenuItem
                      key={notification._id}
                      onClick={() => {
                        navigate(`${ROUTES.CHATS}/${notification.chat._id}`);
                        removeNotification(notification._id);
                      }}
                    >
                      {notification.chat.isGroupChat
                        ? `New message in ${notification.chat.chatName}`
                        : `New message from ${getSender(user, notification.chat.users)}`}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>

              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} px={2}>
                  <Avatar src={user.image} name={user.name} size='sm' cursor='pointer' />
                </MenuButton>
                <MenuList>
                  <ProfileModal user={user}>
                    <MenuItem>My profile</MenuItem>
                  </ProfileModal>
                  <MenuDivider />
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </div>
          </Box>

          <SearchUserDrawer placement='left' onClose={onClose} isOpen={isOpen} />
        </>
      )}
    </>
  );
};

export default HeaderAuth;
