import axios from 'axios';
import { getToken } from './localstorage.datasource';

const datasource = axios.create({
  baseURL: import.meta.env.VITE_LOCKER_ROOM_BACKEND_URL,
  timeout: 10000,
});

datasource.interceptors.request.use(
  config => {
    if (getToken(import.meta.env.VITE_MAIN_BE_TOKEN)) {
      config.headers['Authorization'] = 'Bearer ' + getToken(`${import.meta.env.VITE_MAIN_BE_TOKEN}`);
    }

    return config;
  },
  error => {
    console.log(error);
    Promise.reject(error);
  }
);

datasource.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  error => {
    return Promise.reject(error?.response?.data ?? error);
  }
);

export default datasource;
