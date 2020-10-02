import axios, { AxiosError, AxiosInstance } from 'axios';
import { isDevEnvironment } from '../../utils';
import { UserDataType } from '../../store/types/security';
import { LocalStorageItem } from '../../utils/types';

export const baseURL: string = isDevEnvironment()
  ? 'https://beta-kingswater-back.profsoft.online'
  : 'https://beta-kingswater-back.profsoft.online';

export const http: AxiosInstance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  baseURL: `${baseURL}/api`,
});

http.interceptors.request.use(
  function (config) {
    const userJSON = localStorage.getItem(LocalStorageItem.user);
    if (userJSON) {
      const user: UserDataType = JSON.parse(userJSON);
      // eslint-disable-next-line no-param-reassign
      config.headers.apikey = user.apikey;
    }
    return config;
  },
  function <T>(error: T): Promise<T> {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
    if (error?.response?.status === 403) {
      localStorage.removeItem(LocalStorageItem.user);
      window.location.reload();
    }
    return Promise.reject(error);
  },
);
