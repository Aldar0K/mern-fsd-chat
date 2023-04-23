import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

export enum ROUTES {
  HOME = '/',
  CHATS = '/chats'
}

const Router: FC = () => {
  const isLogin = false;

  return (
    <>
      {isLogin ? (
        <Routes>
          <Route index path={ROUTES.HOME} Component={HomePage} />
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

export default Router;
