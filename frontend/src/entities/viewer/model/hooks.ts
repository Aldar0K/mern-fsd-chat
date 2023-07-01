import { useViewerStore } from './viewer-store';

export const useViewer = () => {
  const viewer = useViewerStore(state => state.viewer);
  return viewer;
};

export const useAuth = () => {
  const viewer = useViewer();
  return !!viewer;
};
