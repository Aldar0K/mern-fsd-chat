import { useNavigate } from 'react-router-dom';

import { ROUTES } from 'consts';
import { User, apiUser, useUserStore } from 'entities/User';
import { useHandleError, useNotify, useToggle } from 'shared/lib';
import { useAuthStore } from '../auth-store';

export const useAuth = () => {
  const navigate = useNavigate();
  const handleError = useHandleError();
  const setUser = useUserStore(state => state.setUser);
  const setAuth = useAuthStore(state => state.setAuth);
  const notify = useNotify();
  const [isLoading, toggleLoading] = useToggle(false);

  const login = async (email: string, password: string) => {
    toggleLoading();

    try {
      const user = await apiUser.login(email, password);
      notify({ text: 'Login successful', type: 'success' });
      _saveCredentials(user);
      setUser(user);
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
      const user = await apiUser.register(name, email, password, imageUrl);
      notify({ text: 'Registration successful', type: 'success' });
      _saveCredentials(user);
      setUser(user);
      setAuth(true);
      navigate(ROUTES.CHATS);
    } catch (error) {
      handleError(error);
    }

    toggleLoading();
  };

  const logout = () => {
    _clearCredentials();
    setUser(null);
    setAuth(false);
    navigate(ROUTES.HOME);
  };

  const _saveCredentials = (data: User) => {
    localStorage.setItem('userData', JSON.stringify(data));
    localStorage.setItem('token', data.token);
  };

  const _clearCredentials = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
  };

  return { login, register, logout, isLoading };
};
