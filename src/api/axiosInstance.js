/* axios instance 생성 파일 */

import axios from 'axios';

const securedInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  timeout: 60000,
});

const publicInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 60000,
});

export { securedInstance, publicInstance };
