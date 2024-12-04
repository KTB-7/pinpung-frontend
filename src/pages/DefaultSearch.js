import SearchBar from '../components/Map/SearchBar';
import SearchResultList from '../components/SearchResultList';
import AIButton from '../components/Map/AIButton';
import LocationButton from '../components/Map/LocationButton';

const DefaultSearch = () => {
  return (
    <div>
      <SearchBar />
      <SearchResultList />
      <AIButton />
      <LocationButton />
    </div>
  );
};

export default DefaultSearch;
