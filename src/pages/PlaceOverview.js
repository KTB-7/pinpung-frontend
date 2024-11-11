import { useParams } from 'react-router-dom';
import BottomSheet from '../components/BottomSheet';

const PlaceOverview = () => {
  const { placeId } = useParams();

  return (
    <>
      <BottomSheet placeId={placeId} />
    </>
  );
};

export default PlaceOverview;
