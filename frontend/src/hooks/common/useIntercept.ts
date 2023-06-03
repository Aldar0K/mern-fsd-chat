import { instance } from 'shared/api';
import { useAuth } from '../useAuth';

export const useIntercept = () => {
  const { logout } = useAuth();

  instance.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  instance.interceptors.request.use(
    config => {
      config.headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      };
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    config => {
      config.headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      };
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
};
