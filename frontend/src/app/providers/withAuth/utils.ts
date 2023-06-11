import { viewerModel } from 'entities/viewer';

export const getToken = (): string | null => {
  const item = localStorage.getItem('token');
  return item ? item : null;
};

export const getViewer = (): viewerModel.Viewer | null => {
  const item = localStorage.getItem('viewer');
  return item ? JSON.parse(item) : null;
};
