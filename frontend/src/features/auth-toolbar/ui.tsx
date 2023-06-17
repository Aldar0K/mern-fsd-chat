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

import { viewerModel } from 'entities/viewer';
import { useLogout } from 'features/auth';
import { ProfileModal } from 'shared/ui';

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
        <ProfileModal user={viewer}>
          <MenuItem>My profile</MenuItem>
        </ProfileModal>
        <MenuDivider />
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AuthToolbar;
