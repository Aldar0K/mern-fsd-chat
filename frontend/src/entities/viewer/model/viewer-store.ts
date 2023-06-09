import { create } from 'zustand';

import { Viewer } from './types';

export type ViewerState = {
  viewer: Viewer | null;
  setViewer: (viewer: Viewer | null) => void;
};

export const useViewerStore = create<ViewerState>(set => ({
  viewer: null,
  setViewer: (viewer: Viewer | null) => {
    set({ viewer });
  }
}));
