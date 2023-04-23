import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ChatPage, ChatsPage, HomePage } from 'pages';

export enum ROUTES {
  HOME = '/',
  CHATS = '/chats'
}

const AppRouter: FC = () => {
  const isLogin = true;

  return (
    <>
      {isLogin ? (
        <Routes>
          <Route index path={ROUTES.HOME} Component={HomePage} />
          <Route path={ROUTES.CHATS} Component={ChatsPage} />
          <Route path={`${ROUTES.CHATS}/:chatId`} Component={ChatPage} />
          <Route path='*' Component={HomePage} />
        </Routes>
      ) : (
        <Routes>
          <Route index path={ROUTES.HOME} Component={HomePage} />
          <Route path='*' Component={HomePage} />
        </Routes>
      )}
    </>
  );
};

export default AppRouter;
