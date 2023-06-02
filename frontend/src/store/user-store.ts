import { create } from 'zustand';

import { User } from 'models';

export type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUserStore = create<UserState>(set => ({
  user: localStorage.getItem('userData')?.length
    ? JSON.parse(localStorage.getItem('userData') as string)
    : null,
  setUser: (user: User | null) => {
    set({ user });
  }
}));
