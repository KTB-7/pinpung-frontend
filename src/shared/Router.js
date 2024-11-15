import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Map from '../components/Map/Map';
import Navbar from '../components/Navbar';
import PlaceOverview from '../pages/PlaceOverview';
import UploadPung from '../pages/UploadPung';
import Login from '../pages/Login';
import useStore from '../store/store';
import OAuthCallback from '../pages/OAuthCallback';

const Router = () => {
  const { showMap, showNavbar } = useStore();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/places/:placeId" element={<PlaceOverview />} />
        <Route path="/places/:placeId/upload-pung" element={<UploadPung />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/oauth2/code/kakao" element={<OAuthCallback />} />
      </Routes>
      {showMap && <Map />}
      {showNavbar && <Navbar />}
    </BrowserRouter>
  );
};

export default Router;
