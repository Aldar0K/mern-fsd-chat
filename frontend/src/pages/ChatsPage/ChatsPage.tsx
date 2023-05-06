import { Box } from '@chakra-ui/react';
import { FC } from 'react';

import { useUserStore } from 'store';
import styles from './ChatsPage.module.scss';

import { Header } from 'components';
import { ChatBox, ChatList } from './components';

const ChatsPage: FC = () => {
  const user = useUserStore(state => state.user);

  return (
    <div className='wrapper'>
      <Header />

      <main className='main'>
        <div className={`container ${styles.container}`}>
          <Box display='flex' w='100%' h='91.5vh' p='10px'>
            {user && <ChatList />}
            {user && <ChatBox />}
          </Box>
        </div>
      </main>
    </div>
  );
};

export default ChatsPage;
