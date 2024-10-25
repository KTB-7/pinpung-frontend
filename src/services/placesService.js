import { placesNearByDataSet } from '../__mocks__/placesNearby';

export const fetchCafesByIds = async (ids) => {
  const idList = ids.map((obj) => obj.id);

  return new Promise((resolve) => {
    const filteredPlaces = placesNearByDataSet.results.filter((place) =>
      idList.includes(place.placeId),
    );
    resolve(filteredPlaces);
  });
};
