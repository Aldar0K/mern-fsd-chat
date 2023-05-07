import { useNavigate } from 'react-router-dom';

import { apiAuth } from 'api';
import { ROUTES } from 'consts';
import { handleError } from 'helpers';
import { useNotify, useToggle } from 'hooks';
import { User } from 'models';
import { useUserStore } from 'store';

export const useAuth = () => {
  const navigate = useNavigate();
  const setUser = useUserStore(state => state.setUser);
  const notify = useNotify();
  const [isLoading, toggleLoading] = useToggle(false);

  const login = async (email: string, password: string) => {
    toggleLoading();

    try {
      const user = await apiAuth.login(email, password);

      notify({ text: 'Login successful', type: 'success' });
      _saveCredentials(user);
      setUser(user);
      navigate(ROUTES.CHATS);
    } catch (error) {
      handleError(error);
    }

    toggleLoading();
  };

  const register = async (name: string, email: string, password: string, imageUrl: string) => {
    toggleLoading();

    try {
      const user = await apiAuth.register(name, email, password, imageUrl);

      notify({ text: 'Registration successful', type: 'success' });
      _saveCredentials(user);
      setUser(user);
      navigate(ROUTES.CHATS);
    } catch (error) {
      handleError(error);
    }

    toggleLoading();
  };

  const logout = () => {
    _clearCredentials();
    setUser(null);
    navigate(ROUTES.HOME);
  };

  const _saveCredentials = (data: User) => {
    localStorage.setItem('userData', JSON.stringify(data));
  };

  const _clearCredentials = () => {
    localStorage.removeItem('userData');
  };

  return { login, register, logout, isLoading };
};
