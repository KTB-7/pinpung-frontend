import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AIRecommendList from '../components/AIRecommendList';
import HomeButton from '../components/Map/HomeButton';
import LocationButton from '../components/Map/LocationButton';

const AIHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get('view') || 'map';

  useEffect(() => {
    if (!searchParams.get('view')) {
      setSearchParams({ view: 'map' });
    }
  }, [searchParams, setSearchParams]);

  const handleToggleView = () => {
    setSearchParams({ view: view === 'map' ? 'list' : 'map' });
  };

  return (
    <>
      <Container
        fluid
        className="d-flex flex-column"
        style={{
          width: '100vw',
          height: '100vh',
          overflowY: 'auto',
          // paddingTop: '1rem',
        }}
      >
        <button
          onClick={handleToggleView}
          style={{ position: 'absolute', top: '10px', left: '10px', zIndex: '10' }}
        >
          {view === 'map' ? '리스트' : '맵'}
        </button>
        {view === 'list' && <AIRecommendList />}
        {/* TODO: ㅇㅇ님을 위한 카페 추천 문구 넣기 */}
      </Container>
      <HomeButton />
      <LocationButton />
    </>
  );
};

export default AIHome;
