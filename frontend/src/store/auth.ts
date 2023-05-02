import { create } from 'zustand';

export type AuthState = {
  isLogin: boolean;
  setLogin: (isLogin: boolean) => void;
};

export const useAuthStore = create<AuthState>(set => ({
  isLogin: !!localStorage.getItem('userData') || false,
  setLogin: (isLogin: boolean) => {
    set({ isLogin });
  }
}));
