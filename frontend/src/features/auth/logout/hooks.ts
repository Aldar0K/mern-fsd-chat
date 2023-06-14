import { useNavigate } from 'react-router-dom';

import { viewerModel } from 'entities/viewer';
import { ROUTES } from 'shared/const';
import { clearCredentials } from '../utils';

export const useLogout = () => {
  const navigate = useNavigate();
  const setViewer = viewerModel.useViewerStore(state => state.setViewer);

  const logout = () => {
    clearCredentials();
    setViewer(null);
    navigate(ROUTES.HOME);
  };

  return logout;
};
