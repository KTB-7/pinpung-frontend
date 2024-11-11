import './App.css';
import './styles/responsive.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Map from './components/Map/Map';
import Navbar from './components/Navbar';
import PlaceOverview from './pages/PlaceOverview';
import UploadPung from './pages/UploadPung';

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
        <Route path="places/:placeId/upload-pung" element={<UploadPung />} />
      </Routes>
      <Map />
      <Navbar />
    </>
  );
}

export default App;
