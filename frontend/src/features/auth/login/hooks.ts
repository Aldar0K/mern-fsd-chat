import { useNavigate } from 'react-router-dom';

import { viewerApi, viewerModel } from 'entities/viewer';
import { ROUTES } from 'shared/const';
import { useHandleError, useNotify, useToggle } from 'shared/lib';
import { clearCredentials, saveCredentials } from '../utils';

export const useAuth = () => {
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

  const register = async (name: string, email: string, password: string, imageUrl: string) => {
    toggleLoading();

    try {
      const user = await viewerApi.register(name, email, password, imageUrl);
      notify({ text: 'Registration successful', type: 'success' });
      saveCredentials(user);
      setViewer(user);
      navigate(ROUTES.CHATS);
    } catch (error) {
      handleError(error);
    }

    toggleLoading();
  };

  const logout = () => {
    clearCredentials();
    setViewer(null);
    navigate(ROUTES.HOME);
  };

  return { login, register, logout, isLoading };
};
