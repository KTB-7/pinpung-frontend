import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchNearbyCafes = async (longitude, latitude, radius) => {
  const response = await axios.get(`${API_URL}/api/places/nearby`, {
    params: {
      x: longitude,
      y: latitude,
      radius,
    },
  });
  return response.data.places;
};

export const fetchCafeDetails = async (placeId) => {
  const response = await axios.get(`${API_URL}/api/places/${placeId}`);

  return response.data;
};
