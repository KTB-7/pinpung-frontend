import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AIRecommendList from '../components/AIRecommendList';
import HomeButton from '../components/Map/HomeButton';
import LocationButton from '../components/Map/LocationButton';
import styled from 'styled-components';

const AIHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get('view') || 'map';

  const handleToggleView = () => {
    setSearchParams({ view: view === 'map' ? 'list' : 'map' });
  };

  return (
    <>
      <Container
        fluid
        className="d-flex flex-column"
        style={{
          paddingTop: '1rem',
        }}
      >
        <ToggleButton onClick={handleToggleView}>{view === 'map' ? '리스트' : '맵'}</ToggleButton>
        {view === 'list' && <AIRecommendList />}
        {/* TODO: ㅇㅇ님을 위한 카페 추천 문구 넣기 */}
      </Container>
      <HomeButton />
      <LocationButton />
    </>
  );
};

export default AIHome;

const ToggleButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
`;
