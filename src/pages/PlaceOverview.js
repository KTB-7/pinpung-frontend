import { useParams } from 'react-router-dom';
import SearchBar from '../components/Map/SearchBar';
import BottomSheet from '../components/BottomSheet';
import AIButton from '../components/Map/AIButton';
import LocationButton from '../components/Map/LocationButton';
import { Container } from 'react-bootstrap';

const PlaceOverview = () => {
  const { placeId } = useParams();

  return (
    <>
      <Container
        fluid
        className="d-flex flex-column"
        style={{
          paddingTop: '1rem',
        }}
      >
        <SearchBar />
      </Container>
      <BottomSheet placeId={placeId} />
      <AIButton />
      <LocationButton />
    </>
  );
};

export default PlaceOverview;
