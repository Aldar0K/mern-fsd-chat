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
  useToast
} from '@chakra-ui/react';
import { FC, useState } from 'react';

import { useToggle } from 'hooks';

// TODO rename to SearchUserDrawer?
const HeaderDrawer: FC<Omit<DrawerProps, 'children'>> = ({ ...props }) => {
  const toast = useToast();
  // TODO add useDebounce hook?
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, toggleLoading] = useToggle(false);

  const handleSearch = () => {
    console.log('search users!', searchValue);

    if (!searchValue) {
      toast({
        title: 'Please enter a value in the search field',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-left'
      });
    }

    try {
      toggleLoading();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer {...props}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth='1px'>Search users</DrawerHeader>
        <DrawerBody>
          <Box display='flex' pb='2px'>
            <Input
              placeholder='Search user by name or email'
              mr='2px'
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
            <Button onClick={handleSearch}>Search</Button>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default HeaderDrawer;
