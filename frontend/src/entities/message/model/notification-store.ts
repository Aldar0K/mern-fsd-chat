import { create } from 'zustand';

import { Message } from 'entities/message';

export type NotificationState = {
  notifications: Message[];
  setNotifications: (notifications: Message[]) => void;
  addNotifications: (notifications: Message[]) => void;
  removeNotification: (notificationId: string) => void;
  clearNotifications: () => void;
};

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  setNotifications: (notifications: Message[]) => {
    set({ notifications });
  },
  addNotifications: (notifications: Message[]) => {
    set({ notifications: get().notifications.concat(...notifications) });
  },
  removeNotification: (notificationId: string) => {
    set({
      notifications: get().notifications.filter(notification => notification._id !== notificationId)
    });
  },
  clearNotifications: () => {
    set({ notifications: [] });
  }
}));
