import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { viewerModel } from 'entities/viewer';
import { ROUTES } from 'shared/const';

import { AuthPage, ChatsPage } from 'pages';

const AppRouter: FC = () => {
  const isAuth = viewerModel.useAuth();

  return (
    <>
      {isAuth ? (
        <Routes>
          <Route index path={`${ROUTES.CHATS}/*`} Component={ChatsPage} />
          <Route path='*' Component={ChatsPage} />
        </Routes>
      ) : (
        <Routes>
          <Route index path={ROUTES.HOME} Component={AuthPage} />
          <Route path='*' Component={AuthPage} />
        </Routes>
      )}
    </>
  );
};

export default AppRouter;
