import { BellIcon } from '@chakra-ui/icons';
import {
  Button,
  List,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

import { messageModel } from 'entities/message';
import { userLib } from 'entities/user';
import { viewerModel } from 'entities/viewer';
import { ROUTES } from 'shared/const';

const selector = (state: messageModel.NotificationState) => ({
  notifications: state.notifications,
  removeNotification: state.removeNotification,
  clearNotifications: state.clearNotifications
});

const NotificationBadge: FC = () => {
  const navigate = useNavigate();
  const { notifications, removeNotification, clearNotifications } =
    messageModel.useNotificationStore(selector, shallow);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const viewer = viewerModel.useViewer();

  if (!viewer) return null;

  return (
    <Menu isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <MenuButton p={1} as={Button} className='relative'>
        {!!notifications.length && (
          <Text className='absolute right-[4px] top-[2px]'>{notifications.length}</Text>
        )}
        <BellIcon color={notifications.length ? 'yellow.400' : 'black'} fontSize='2xl' m={1} />
      </MenuButton>

      <MenuList px={2}>
        {notifications.length ? (
          <>
            <List maxHeight='216px' overflowY='auto'>
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
                    : `New message from ${userLib.getSender(viewer, notification.chat.users)}`}
                </MenuItem>
              ))}
            </List>
            <Button
              variant='solid'
              width='full'
              className='mt-1'
              onClick={() => {
                clearNotifications();
                onClose();
              }}
            >
              Clear
            </Button>
          </>
        ) : (
          'No new messages'
        )}
      </MenuList>
    </Menu>
  );
};

export default NotificationBadge;
