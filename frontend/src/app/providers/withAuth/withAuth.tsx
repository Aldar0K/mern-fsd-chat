/* eslint-disable react/display-name */

import { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { viewerModel } from 'entities/viewer';
import { ROUTES } from 'shared/const';
import { useIntercept } from './hooks';
import { getToken, getViewer } from './utils';

const withAuth = (WrappedComponent: FunctionComponent) => {
  return () => {
    useIntercept();
    const navigate = useNavigate();
    const isAuth = viewerModel.useAuth();
    const setViewer = viewerModel.useViewerStore(store => store.setViewer);

    useEffect(() => {
      if (!isAuth) {
        const token = getToken();
        const viewer = getViewer();

        if (token && viewer) {
          setViewer(viewer);
        } else {
          navigate(ROUTES.HOME);
        }
      }
    }, [isAuth]);

    return <WrappedComponent />;
  };
};

export default withAuth;
