import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { viewerModel } from 'entities/viewer';
import { ROUTES } from 'shared/const';

import { ChatsPage, HomePage } from 'pages';

const AppRouter: FC = () => {
  const viewer = viewerModel.useViewerStore(state => state.viewer);

  return (
    <>
      {viewer ? (
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
