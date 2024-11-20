import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import OAuthCallback from '../pages/OAuthCallback';
import Login from '../pages/Login';
import Map from '../components/Map/Map';
import Navbar from '../components/Navbar';
import PlaceOverview from '../pages/PlaceOverview';
import UploadPung from '../pages/UploadPung';
import UploadReview from '../pages/UploadReview';
import PrivateRoute from './PrivateRoute';
import useStore from '../store/store';

const Router = () => {
  const showMap = useStore((state) => state.showMap);
  const showNavbar = useStore((state) => state.showNavbar);

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
      {showMap && <Map />}
      {showNavbar && <Navbar />}
    </BrowserRouter>
  );
};

export default Router;
