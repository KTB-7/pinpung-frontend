/* 인터셉터 설정 파일 */

import { securedInstance } from '../api/axiosInstance';
import useAuthStore from '../store/auth';

export const setupRequestInterceptor = () => {
  securedInstance.interceptors.request.use(
    (config) => {
      const token = useAuthStore.getState().accessToken;

      config.headers['Cache-Control'] = 'no-cache';
      config.headers['Pragma'] = 'no-cache';
      config.headers['Expires'] = '0';

      // 추가 보안 헤더
      //config.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload';

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn('AccessToken이 없습니다.');
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};
