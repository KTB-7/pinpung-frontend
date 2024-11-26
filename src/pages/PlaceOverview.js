import { useParams } from 'react-router-dom';
import SearchBar from '../components/Map/SearchBar';
import BottomSheet from '../components/BottomSheet';
import AIButton from '../components/Map/AIButton';
import LocationButton from '../components/Map/LocationButton';

const PlaceOverview = () => {
  const { placeId } = useParams();

  return (
    <>
      <SearchBar />
      <BottomSheet placeId={placeId} />
      <AIButton />
      <LocationButton />
    </>
  );
};

export default PlaceOverview;
