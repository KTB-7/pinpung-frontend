import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchPungs = async (placeId, page) => {
  const response = await axios.get(`${API_URL}/pungs/${placeId}`, page);

  return response.data;
};

export const addPung = async (userId, placeId, imageWithText, pureImage, text) => {
  const data = new FormData();

  data.append('userId', userId);
  data.append('placeId', placeId);
  data.append('imageWithText', imageWithText); // 이미지 파일 객체
  data.append('pureImage', pureImage); // 순수 이미지 파일 객체
  data.append('text', text);

  const response = await axios.post(`${API_URL}/pungs/upload`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.status;
};
