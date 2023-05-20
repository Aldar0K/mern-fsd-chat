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
import { FC, useEffect, useState } from 'react';

import { useDebounce, useSearchUserQuery } from 'hooks';

import { ChatsLoader, UserCard } from 'components';

const SearchUserDrawer: FC<Omit<DrawerProps, 'children'>> = ({ onClose, ...props }) => {
  const [value, setValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const { data: searchResults, isLoading: searchLoading } = useSearchUserQuery(searchValue);
  const debouncedSearchValue = useDebounce<string>(value, 500);
  useEffect(() => {
    if (value.length) setSearchValue(value);
  }, [debouncedSearchValue]);

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
