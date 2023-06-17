import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList
} from '@chakra-ui/react';
import { FC } from 'react';

import { UserProfileModal } from 'entities/user';
import { viewerModel } from 'entities/viewer';
import { useLogout } from 'features/auth';

const AuthToolbar: FC = () => {
  const viewer = viewerModel.useViewer();
  const logout = useLogout();

  if (!viewer) return null;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} px={2}>
        <Avatar src={viewer.image} name={viewer.name} size='sm' cursor='pointer' />
      </MenuButton>
      <MenuList>
        <UserProfileModal user={viewer}>
          <MenuItem>My profile</MenuItem>
        </UserProfileModal>
        <MenuDivider />
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AuthToolbar;
