import axios from 'axios';

import queryClient from './queryClient';

const api = axios.create({
  baseURL: '/api', // import.meta.env.VITE_API_URL || 'http://localhost:3000/'
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      queryClient.setQueryData(['user'], null);
      window.location.href = '/auth/login';
    }
    return Promise.reject(err);
  },
);

export default api;
