/* 인터셉터 설정 파일 */

import instance from '../api/axiosInstance';

export const setupRequestInterceptor = () => {
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};
