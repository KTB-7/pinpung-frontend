import './App.css';
import './styles/responsive.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Map from './components/Map/Map';
import Navbar from './components/Navbar';
import PlaceOverview from './pages/PlaceOverview';
import UploadPung from './pages/UploadPung';
import Login from './pages/Login';

// if (process.env.NODE_ENV === 'development') {
//   // 개발 환경에서만 import
//   import('./mocks/browser').then(({ worker }) => {
//     worker.start({ onUnhandledRequest: 'bypass', quiet: false });
//   });
// }

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/places/:placeId" element={<PlaceOverview />} />
        <Route path="/places/:placeId/upload-pung" element={<UploadPung />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/oauth2/code/kakao" element={<OAuthCallback />} />
      </Routes>
      <Map />
      <Navbar />
    </>
  );
}

export default App;
