import { AxiosError } from 'axios';
import { isDevEnvironment } from './isDevEnvironment';

const DEFAULT_MESSAGE = 'Ошибка сервера';

export const getErrorMessage = (e: AxiosError): string => {
  let errorMessage: string = DEFAULT_MESSAGE;

  if (e.response) {
    if (e.response.data.errorMessages) {
      [errorMessage] = e.response.data.errorMessages;
    } else if (isDevEnvironment()) {
      errorMessage = e.response.statusText;
    }
  } else if (e.request && e.request.message) {
    errorMessage = e.request.message;
  } else if (e.message && isDevEnvironment()) {
    errorMessage = e.message;
  }

  return errorMessage;
};
