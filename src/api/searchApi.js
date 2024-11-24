import { securedInstance } from './axiosInstance';

const API_URL = process.env.REACT_APP_API_URL;

export const searchMap = async (userId, keyword, swLng, swLat, neLng, neLat) => {
  try {
    const response = await securedInstance.get(`${API_URL}/search/map`, {
      params: {
        userId,
        keyword,
        swLng,
        swLat,
        neLng,
        neLat,
      },
    });
    return response.data;
  } catch (error) {
    console.error('지도에서 검색 실패', error);
    throw new Error('지도에서 검색에 실패했습니다.');
  }
};

export const searchListAccuracy = async (userId, keyword, swLng, swLat, neLng, neLat) => {
  try {
    const response = await securedInstance.get(`${API_URL}/search/list/accuracy`, {
      params: {
        userId,
        keyword,
        swLng,
        swLat,
        neLng,
        neLat,
      },
    });
    return response.data;
  } catch (error) {
    console.error('정확도순 검색 리스트 가져오기 실패', error);
    throw new Error('정확도순 검색 리스트 가져오기에 실패했습니다.');
  }
};

export const searchListDistance = async (userId, keyword, swLng, swLat, neLng, neLat, x, y) => {
  try {
    const response = await securedInstance.get(`${API_URL}/search/list/distance`, {
      params: {
        userId,
        keyword,
        swLng,
        swLat,
        neLng,
        neLat,
        x,
        y,
      },
    });
    return response.data;
  } catch (error) {
    console.error('거리순 검색 리스트 가져오기 실패', error);
    throw new Error('거리순 검색 리스트 가져오기에 실패했습니다.');
  }
};
