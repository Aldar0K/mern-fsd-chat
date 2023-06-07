import axios from 'axios';

import { ERROR_MESSAGES } from 'shared/const';
import { useNotify } from './useNotify';

export const useHandleError = () => {
  const notify = useNotify();

  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.message;
      notify({ text: errorMessage, type: 'error' });
    } else {
      notify({ text: ERROR_MESSAGES.DEFAULT, type: 'error' });
    }
  };

  return handleError;
};
