import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import OAuthCallback from '../pages/OAuthCallback';
import Login from '../pages/Login';
import Map from '../components/Map/Map';
import Navbar from '../components/Navbar';
import SearchBar from '../components/Map/SearchBar';
import AIButton from '../components/Map/AIButton';
import LocationButton from '../components/Map/LocationButton';
import PlaceOverview from '../pages/PlaceOverview';
import UploadPung from '../pages/UploadPung';
import UploadReview from '../pages/UploadReview';
import PrivateRoute from './PrivateRoute';
import useStore from '../store/store';

const Router = () => {
  const showMap = useStore((state) => state.showMap);
  const showNavbar = useStore((state) => state.showNavbar);

  const handleSearchBarClick = () => {
    // 모바일 환경에서 키보드가 열리도록 포커스 설정
    const searchBarInput = document.querySelector('#home-search-input');
    if (searchBarInput) {
      searchBarInput.focus();
    }
  };

  const handleAIButtonClick = () => {};

  const handleLocationButtonClick = () => {};

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/places/:placeId" element={<PlaceOverview />} />
        <Route path="/places/:placeId/upload-pung" element={<UploadPung />} />
        <Route path="/places/:placeId/upload-review" element={<UploadReview />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
      <SearchBar onSearchBarClick={handleSearchBarClick} />
      <AIButton onClick={handleAIButtonClick} />
      <LocationButton onClick={handleLocationButtonClick} />
      {showMap && <Map />}
      {showNavbar && <Navbar />}
    </BrowserRouter>
  );
};

export default Router;
