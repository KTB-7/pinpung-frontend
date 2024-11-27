import { securedInstance } from './axiosInstance';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchPungs = async (placeId, page) => {
  try {
    const response = await securedInstance.get(`${API_URL}/api/pungs/${placeId}`, page);

    return response.data;
  } catch (error) {
    console.error('펑 가져오기 실패:', error);
    throw new Error('펑을 가져오는 데 실패했습니다.');
  }
};

export const addPung = async (userId, placeId, imageWithText, pureImage, text) => {
  const data = new FormData();

  data.append('userId', userId);
  data.append('placeId', placeId);
  data.append('imageWithText', imageWithText);
  data.append('pureImage', pureImage);
  data.append('text', text);

  try {
    const response = await securedInstance.post(`${API_URL}/api/pungs`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('펑 업로드하기 실패:', error);
    throw new Error('펑 업로드에 실패했습니다.');
  }
};
