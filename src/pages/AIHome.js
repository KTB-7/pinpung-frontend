import React from 'react';
import HomeButton from '../components/Map/HomeButton';
import LocationButton from '../components/Map/LocationButton';
import SearchBar from '../components/Map/SearchBar';
import { Container } from 'react-bootstrap';

const AIHome = () => {
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
      <HomeButton />
      <LocationButton />
    </>
  );
};

export default AIHome;
