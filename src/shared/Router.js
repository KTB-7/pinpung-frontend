import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import OAuthCallback from '../pages/OAuthCallback';
import Map from '../components/Map/Map';
import Navbar from '../components/Navbar';
import PlaceOverview from '../pages/PlaceOverview';
import UploadPung from '../pages/UploadPung';
import UploadReview from '../pages/UploadReview';
import useStore from '../store/store';

const Router = () => {
  const { showMap, showNavbar } = useStore();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/places/:placeId" element={<PlaceOverview />} />
        <Route path="/places/:placeId/upload-pung" element={<UploadPung />} />
        <Route path="/places/:placeId/upload-review" element={<UploadReview />} />
        <Route path="/login/oauth2/code/kakao" element={<OAuthCallback />} />
      </Routes>
      {showMap && <Map />}
      {showNavbar && <Navbar />}
    </BrowserRouter>
  );
};

export default Router;
