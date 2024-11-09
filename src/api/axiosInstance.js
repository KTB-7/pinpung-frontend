/* axios instance 생성 파일 */

import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: false,
  timeout: 60000,
});

export default instance;
