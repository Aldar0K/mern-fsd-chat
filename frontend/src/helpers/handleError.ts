import axios from 'axios';

export const handleError = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response) {
    const errorMessage = error.response.data.message;
    // notifyErr(errorMessage);
    console.log(errorMessage);
  } else {
    // notifyErr(ERROR_MESSAGES.DEFAULT);
    console.log('Something went wrong');
  }
};
