import { Box } from '@chakra-ui/react';
import { FC } from 'react';

import { useUserStore } from 'store';
import styles from './ChatPage.module.scss';

import { Header } from 'components';
import { ChatBox, ChatList } from './components';

const ChatPage: FC = () => {
  const user = useUserStore(state => state.user);

  return (
    <div className='wrapper'>
      <Header />

      <main className='main'>
        <div className={`container ${styles.container}`}>
          <Box display='flex' w='100%' p='10px'>
            {user && <ChatList />}
            {user && <ChatBox />}
          </Box>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
