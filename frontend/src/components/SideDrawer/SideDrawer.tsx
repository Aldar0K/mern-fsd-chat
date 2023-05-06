import { Box, Button, Tooltip } from '@chakra-ui/react';
import { useToggle } from 'hooks';
import { FC, useState } from 'react';

const SideDrawer: FC = () => {
  const [search, setSearch] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, toggleLoading] = useToggle(false);
  const [chatLoading, toggleChatLoading] = useToggle(false);

  return (
    <>
      <Box>
        <Tooltip label='Search users in the chats' hasArrow placeContent='bottom-end'>
          <Button variant='ghost'>
            <i className='fas fa-search' />
          </Button>
        </Tooltip>
      </Box>
    </>
  );
};

export default SideDrawer;
