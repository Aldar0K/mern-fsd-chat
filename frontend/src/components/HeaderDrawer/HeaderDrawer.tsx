import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Input,
  Skeleton,
  Stack
} from '@chakra-ui/react';
import { FC, useState } from 'react';

import { apiUser } from 'api';
import { handleError } from 'helpers';
import { useNotify, useToggle } from 'hooks';
import { User } from 'models';

import { UserCard } from 'components';

// TODO move to separate component.
const ChatsLoader = () => {
  return (
    <Stack>
      <Skeleton height='45px' />
      <Skeleton height='45px' />
      <Skeleton height='45px' />
      <Skeleton height='45px' />
    </Stack>
  );
};

// TODO rename to SearchUserDrawer?
const HeaderDrawer: FC<Omit<DrawerProps, 'children'>> = ({ ...props }) => {
  const notify = useNotify();
  // TODO add useDebounce hook?
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isLoading, toggleLoading] = useToggle(false);

  // TODO add form for enter register.
  const handleSearch = async () => {
    console.log('search users!', searchValue);

    if (!searchValue) {
      notify({ text: 'Please enter a value in the search field', type: 'warning' });
    }

    try {
      toggleLoading();

      const results = await apiUser.searchUser(searchValue);
      console.log(results);
      setSearchResults(results);

      toggleLoading();
    } catch (error) {
      handleError(error);
      // notify({ text: 'Failed to load the search results', type: 'error' });
    }
  };

  return (
    <Drawer {...props}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth='1px'>Search users</DrawerHeader>
        <DrawerBody>
          <Box display='flex' mb='2'>
            <Input
              placeholder='Search user by name or email'
              mr='2'
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
            <Button onClick={handleSearch}>Search</Button>
          </Box>

          {isLoading ? (
            <ChatsLoader />
          ) : (
            <Stack>
              {searchResults.map(user => (
                <UserCard key={user._id} user={user} />
              ))}
            </Stack>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default HeaderDrawer;
