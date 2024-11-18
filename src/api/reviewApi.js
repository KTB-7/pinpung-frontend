import axios from 'axios';

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
    const response = await axios.post(`${API_URL}/api/pungs/upload`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('펑 업로드 실패:', error);
    throw new Error('펑 업로드에 실패했습니다.');
  }
};
