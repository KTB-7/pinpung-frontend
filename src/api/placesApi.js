import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// 사용자 주변 카페들 불러오기
export const fetchNearbyCafes = async (longitude, latitude, radius) => {
  console.log(API_URL);
  try {
    const response = await axios.get(`${API_URL}/api/places/nearby`, {
      params: {
        x: longitude,
        y: latitude,
        radius,
      },
    });
    return response.data;
  } catch (error) {
    console.error('주변 카페 정보 가져오기 실패', error);
    throw new Error('주변 카페 정보를 불러올 수 없습니다.');
  }
};
// 카페 세부정보 불러오기
export const fetchCafeDetails = async (placeId) => {
  try {
    const response = await axios.get(`${API_URL}/api/places/${placeId}`);

    return response.data;
  } catch (error) {
    console.error('카페 상세 정보 불러오기 실패:', error);
    throw new Error('카페 상세 정보를 불러올 수 없습니다.');
  }
};
