import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useUserStore } from 'entities/User';
import { ROUTES } from 'shared/const';

import { ChatsPage, HomePage } from 'pages';

const AppRouter: FC = () => {
  const user = useUserStore(state => state.user);

  return (
    <>
      {user ? (
        <Routes>
          <Route index path={`${ROUTES.CHATS}/*`} Component={ChatsPage} />
          <Route path='*' Component={ChatsPage} />
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
