import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { viewerModel } from 'entities/viewer';
import { ROUTES } from 'shared/const';
import styles from './MainPage.module.scss';

import { Header } from 'shared/ui';
import { ChatBox } from 'widgets/chat-box';
import { ChatBoxPlaceholder, ChatList } from './components';

const MainPage: FC = () => {
  const viewer = viewerModel.useViewer();

  return (
    <div className='wrapper'>
      <Header />

      <main className='main'>
        <div className={`container ${styles.container}`}>
          <Box display='flex' h='93.5vh' w='100%' p='10px' justifyContent='space-between'>
            {viewer && (
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

export default MainPage;
