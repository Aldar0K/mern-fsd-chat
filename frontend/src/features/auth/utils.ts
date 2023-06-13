import { User } from 'entities/User';

export const saveCredentials = (data: User) => {
  localStorage.setItem('viewer', JSON.stringify(data));
  localStorage.setItem('token', data.token);
};

export const clearCredentials = () => {
  localStorage.removeItem('viewer');
  localStorage.removeItem('token');
};
