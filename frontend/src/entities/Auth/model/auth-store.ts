import { create } from 'zustand';

export type AuthState = {
  isAuth: boolean;
  setAuth: (isAuth: boolean) => void;
};

export const useAuthStore = create<AuthState>(set => ({
  isAuth: false,
  setAuth: (isAuth: boolean) => {
    set({ isAuth });
  }
}));
