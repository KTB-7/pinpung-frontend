import axios from 'axios';

export const fetchNearbyCafes = async (longitude, latitude, radius) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/places/nearby`, {
    params: {
      x: longitude,
      y: latitude,
      radius,
    },
  });
  return response.data.places;
};

export const fetchCafeDetails = async (placeId) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/places/${placeId}`);
  return response.data;
};
