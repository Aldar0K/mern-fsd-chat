import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useUserStore } from 'entities/User';
import { ROUTES } from 'shared/const';
import styles from './ChatsPage.module.scss';

import { Header } from 'components';
import { ChatBox, ChatBoxPlaceholder, ChatList } from './components';

const ChatsPage: FC = () => {
  const user = useUserStore(state => state.user);

  return (
    <div className='wrapper'>
      <Header />

      <main className='main'>
        <div className={`container ${styles.container}`}>
          <Box display='flex' h='93.5vh' w='100%' p='10px' justifyContent='space-between'>
            {user && (
              <>
                <ChatList />
                <Routes>
                  <Route path={ROUTES.CHAT} Component={ChatBox} />
                  <Route path='*' Component={ChatBoxPlaceholder} />
                </Routes>
              </>
            )}
          </Box>
        </div>
      </main>
    </div>
  );
};

export default ChatsPage;
