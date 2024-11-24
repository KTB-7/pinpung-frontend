import { securedInstance, publicInstance } from './axiosInstance';

const API_URL = process.env.REACT_APP_API_URL;

export const addReview = async (userId, placeId, text, image) => {
  const data = new FormData();

  data.append('userId', userId);
  data.append('placeId', placeId);
  data.append('text', text);

  if (image) {
    data.append('image', image);
  }
  try {
    const response = await securedInstance.post(`${API_URL}/api/reviews/upload`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('리뷰 업로드 실패:', error);
    throw new Error('리뷰 업로드에 실패했습니다.');
  }
};
