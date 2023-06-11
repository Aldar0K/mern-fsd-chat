import { useNavigate } from 'react-router-dom';

import { User } from 'entities/User';
import { viewerApi, viewerModel } from 'entities/viewer';
import { ROUTES } from 'shared/const';
import { useHandleError, useNotify, useToggle } from 'shared/lib';
import { useAuthStore } from '../auth-store';

export const useAuth = () => {
  const navigate = useNavigate();
  const handleError = useHandleError();
  const setViewer = viewerModel.useViewerStore(state => state.setViewer);
  const setAuth = useAuthStore(state => state.setAuth);
  const notify = useNotify();
  const [isLoading, toggleLoading] = useToggle(false);

  const login = async (email: string, password: string) => {
    toggleLoading();

    try {
      const user = await viewerApi.login(email, password);
      notify({ text: 'Login successful', type: 'success' });
      _saveCredentials(user);
      setViewer(user);
      setAuth(true);
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
      _saveCredentials(user);
      setViewer(user);
      setAuth(true);
      navigate(ROUTES.CHATS);
    } catch (error) {
      handleError(error);
    }

    toggleLoading();
  };

  const logout = () => {
    _clearCredentials();
    setViewer(null);
    setAuth(false);
    navigate(ROUTES.HOME);
  };

  const _saveCredentials = (data: User) => {
    localStorage.setItem('viewer', JSON.stringify(data));
    localStorage.setItem('token', data.token);
  };

  const _clearCredentials = () => {
    localStorage.removeItem('viewer');
    localStorage.removeItem('token');
  };

  return { login, register, logout, isLoading };
};
