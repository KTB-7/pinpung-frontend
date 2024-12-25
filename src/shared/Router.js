import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import MapLayout from '../components/Map/MapLayout';
import AIHome from '../pages/AIHome';
import AIMapLayout from '../components/Map/AIMapLayout';
import MyPage from '../pages/MyPage';
import OAuthCallback from '../pages/OAuthCallback';
import Login from '../pages/Login';
import Navbar from '../components/Navbar';
import PlaceOverview from '../pages/PlaceOverview';
import AIPlaceOverview from '../pages/AIPlaceOverview';
import UserPreferences from '../pages/UserPreferences';
import UploadPung from '../pages/UploadPung';
import UploadReview from '../pages/UploadReview';
import DefaultSearch from '../pages/DefaultSearch';
import PrivateRoute from './PrivateRoute';
import useStore from '../store/store';

const Router = () => {
  const showNavbar = useStore((state) => state.showNavbar);

  return (
    <BrowserRouter>
      <Routes>
        {/* PrivateRoute로 보호된 라우트 그룹 */}
        <Route element={<PrivateRoute />}>
          {/* MapLayout이 필요한 페이지 */}
          <Route element={<MapLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/places/:placeId" element={<PlaceOverview />} />
          </Route>
          <Route element={<AIMapLayout />}>
            <Route path="/ai-home" element={<AIHome />} />
            <Route path="/ai-home/places/:placeId" element={<AIPlaceOverview />} />
          </Route>
          <Route path="/user-preferences" element={<UserPreferences />} />
          <Route path="/places/:placeId/upload-pung" element={<UploadPung />} />
          <Route path="/places/:placeId/upload-review" element={<UploadReview />} />
          <Route path="/search-results" element={<DefaultSearch />} />
        </Route>

        {/* 비보호 라우트 */}
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {showNavbar && <Navbar />}
    </BrowserRouter>
  );
};

export default Router;
