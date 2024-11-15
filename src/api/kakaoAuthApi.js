//import instance from './axiosInstance';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const kakaoLogin = async () => {
  const response = await axios.get(`${API_URL}/login`);
  if (response.data.accessToken) {
    localStorage.setItem('accessToken', response.data.accessToken);
  }
  console.log('at kakaoAuthApi', response.data);
  return response.data;
};

// 액세스 토큰 갱신

// 로그아웃
