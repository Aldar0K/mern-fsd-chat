import { useNavigate } from 'react-router-dom';

import { viewerApi, viewerModel } from 'entities/viewer';
import { ROUTES } from 'shared/const';
import { useHandleError, useNotify, useToggle } from 'shared/lib/hooks';
import { saveCredentials } from '../utils';

export const useLogin = () => {
  const navigate = useNavigate();
  const handleError = useHandleError();
  const setViewer = viewerModel.useViewerStore(state => state.setViewer);
  const notify = useNotify();
  const [isLoading, toggleLoading] = useToggle(false);

  const login = async (email: string, password: string) => {
    toggleLoading();

    try {
      const user = await viewerApi.login(email, password);
      notify({ text: 'Login successful', type: 'success' });
      saveCredentials(user);
      setViewer(user);
      navigate(ROUTES.CHATS);
    } catch (error) {
      handleError(error);
    }

    toggleLoading();
  };

  return [login, isLoading] as const;
};
