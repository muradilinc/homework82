import axios from 'axios';
import { BASE_URL } from '../constants/link';
import { RootState } from '../app/store';
import { Store } from '@reduxjs/toolkit';

const axiosApi = axios.create({
  baseURL: BASE_URL,
});

export const addInterceptor = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config) => {
    const token = store.getState().users.user?.token;
    config.headers.set('Authorization', token ? 'Bearer ' + token : undefined);
    return config;
  });
};

export default axiosApi;
