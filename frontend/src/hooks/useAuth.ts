import { useToast } from '@chakra-ui/react';
import axios, { AxiosRequestConfig } from 'axios';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from 'consts';
import { handleError } from 'helpers';
import { useAuthStore } from 'store';
import { useToggle } from './useToggle';
// import { apiAuth } from 'api';

export interface UserData {
  _id: string;
  token: string;
  email: string;
  name: string;
  image: string;
}

export const useAuth = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const setLogin = useAuthStore(state => state.setLogin);
  const [isLoading, toggleLoading] = useToggle(false);

  const login = async (email: string, password: string) => {
    toggleLoading();

    try {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-type': 'application/json'
        }
      };

      const response = await axios.post<UserData>('/api/user/login', { email, password }, config);

      toast({
        title: 'Login successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });

      _saveCredentials(response.data);
      setLogin(true);
      navigate(ROUTES.CHATS);
    } catch (error) {
      handleError(error);
    }

    toggleLoading();
  };

  const register = async (name: string, email: string, password: string, imageUrl: string) => {
    toggleLoading();

    try {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-type': 'application/json'
        }
      };

      const response = await axios.post<UserData>(
        '/api/user',
        { name, email, password, imageUrl },
        config
      );

      toast({
        title: 'Registration successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });

      _saveCredentials(response.data);
      setLogin(true);
      navigate(ROUTES.CHATS);
    } catch (error) {
      handleError(error);
    }

    toggleLoading();
  };

  const logout = () => {
    _clearCredentials();
    setLogin(false);
    navigate(ROUTES.HOME);
  };

  const _saveCredentials = (data: UserData) => {
    localStorage.setItem('userData', JSON.stringify(data));
  };

  const _clearCredentials = () => {
    localStorage.removeItem('userData');
  };

  return { login, register, logout, isLoading };
};
