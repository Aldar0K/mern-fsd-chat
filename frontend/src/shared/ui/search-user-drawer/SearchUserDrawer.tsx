import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Input,
  Stack
} from '@chakra-ui/react';
import { FC } from 'react';

import { UserCard, userModel } from 'entities/user';

import { ChatsLoader } from 'shared/ui/chats-loader';

const SearchUserDrawer: FC<Omit<DrawerProps, 'children'>> = ({ onClose, ...props }) => {
  const [value, setValue, searchResults, searchLoading] = userModel.useSearchUsers();

  return (
    <Drawer onClose={onClose} {...props}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth='1px'>Search users</DrawerHeader>

        <DrawerBody>
          <Box display='flex' mb='2'>
            <Input
              placeholder='Search user by name or email'
              value={value}
              onChange={e => setValue(e.target.value)}
            />
          </Box>

          {searchLoading ? (
            <ChatsLoader amount={10} />
          ) : (
            <Stack>
              {!!searchResults?.length &&
                searchResults.map(user => (
                  <UserCard key={user._id} user={user} onClose={onClose} />
                ))}
            </Stack>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchUserDrawer;
