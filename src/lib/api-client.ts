import axios from 'axios';

import { env } from '@/config/env';
import { getAccessToken } from './auth-session';

export const api = axios.create({
  baseURL: env.API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
