import React from 'react';
import AIButton from '../components/Map/AIButton';
import LocationButton from '../components/Map/LocationButton';
import SearchBar from '../components/Map/SearchBar';

const Home = () => {
  return (
    <>
      <SearchBar />
      <AIButton />
      <LocationButton />
    </>
  );
};

export default Home;
