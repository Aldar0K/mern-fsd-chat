import { useNavigate } from 'react-router-dom';

import { viewerApi, viewerModel } from 'entities/viewer';
import { ROUTES } from 'shared/const';
import { useHandleError, useNotify, useToggle } from 'shared/lib/hooks';
import { saveCredentials } from '../utils';

export const useRegister = () => {
  const navigate = useNavigate();
  const handleError = useHandleError();
  const setViewer = viewerModel.useViewerStore(state => state.setViewer);
  const notify = useNotify();
  const [isLoading, toggleLoading] = useToggle(false);

  const register = async (name: string, email: string, password: string, imageUrl: string) => {
    toggleLoading();

    try {
      const user = await viewerApi.register(name, email, password, imageUrl);
      notify({ text: 'Registration successful', type: 'success' });
      saveCredentials(user);
      setViewer(user);
      navigate(ROUTES.CHATS);
    } catch (error) {
      handleError(error);
    }

    toggleLoading();
  };

  return [register, isLoading] as const;
};
