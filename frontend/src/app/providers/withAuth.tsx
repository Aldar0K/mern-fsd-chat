import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { viewerModel } from 'entities/viewer';
import { ROUTES } from 'shared/const';
import { useIntercept } from 'shared/lib';

const withAuth = (WrappedComponent: () => ReactNode) => () => {
  const isAuth = viewerModel.useAuth();
  const navigate = useNavigate();
  useIntercept();

  useEffect(() => {
    if (!isAuth) navigate(ROUTES.HOME);
  }, [isAuth]);

  useEffect(() => {
    console.log('initialize auth check');
  }, []);

  return WrappedComponent;
};

export default withAuth;
