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

      <div className={`container ${styles.container}`}>
        <h1>ChatsPage</h1>
        <Box>
          {user && <ChatList />}
          {user && <ChatBox />}
        </Box>
      </div>
    </div>
  );
};

export default ChatsPage;
