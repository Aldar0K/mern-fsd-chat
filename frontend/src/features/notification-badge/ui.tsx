import { BellIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

import { NotificationState, useNotificationStore } from 'entities/message';
import { getSender } from 'entities/user';
import { viewerModel } from 'entities/viewer';
import { ROUTES } from 'shared/const';

const selector = (state: NotificationState) => ({
  notifications: state.notifications,
  removeNotification: state.removeNotification,
  clearNotifications: state.clearNotifications
});

const NotificationBadge: FC = () => {
  const navigate = useNavigate();
  const { notifications, removeNotification } = useNotificationStore(selector, shallow);
  const viewer = viewerModel.useViewer();

  if (!viewer) return null;

  return (
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
              : `New message from ${getSender(viewer, notification.chat.users)}`}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default NotificationBadge;