import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchNearbyCafes = async (longitude, latitude, radius) => {
  console.log('fetchNearbyCafes params:', longitude, latitude, radius);
  const response = await axios.get(`${API_URL}/api/places/nearby`, {
    params: {
      x: longitude,
      y: latitude,
      radius,
    },
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  });

  return response.data;
};

export const fetchCafeDetails = async (placeId) => {
  const response = await axios.get(`${API_URL}/api/places/${placeId}`);

  return response.data;
};
