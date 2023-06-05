import { create } from 'zustand';

import { getToken } from '../lib/helpers/getToken';

export type AuthState = {
  isAuth: boolean;
  setAuth: (isAuth: boolean) => void;
};

export const useAuthStore = create<AuthState>(set => ({
  isAuth: !!getToken(),
  setAuth: (isAuth: boolean) => {
    set({ isAuth });
  }
}));
