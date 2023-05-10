import axios from 'axios';

import { ERROR_MESSAGES } from 'consts';
import { useNotify } from './useNotify';

export const useHandleError = () => {
  const notify = useNotify();

  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.message;
      notify({ text: errorMessage, type: 'error' });
      console.log(errorMessage);
    } else {
      notify({ text: ERROR_MESSAGES.DEFAULT, type: 'error' });
      console.log('Something went wrong');
    }
  };

  return handleError;
};
