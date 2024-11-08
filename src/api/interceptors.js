/* 인터셉터 설정 파일 */

import instance from '../api/axiosInstance';

export const setupRequestInterceptor = () => {
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');

      config.headers['Cache-Control'] = 'no-cache';
      config.headers['Pragma'] = 'no-cache';
      config.headers['Expires'] = '0';

      // 추가 보안 헤더
      //config.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload';

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
