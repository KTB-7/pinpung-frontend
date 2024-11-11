import './App.css';
import './styles/responsive.css';
import useStore from './store';
import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import Home from './pages/Home';
import Map from './components/Map/Map';
import Navbar from './components/Navbar';
import BottomSheet from './components/BottomSheet';
import UploadPung from './pages/UploadPung';

// if (process.env.NODE_ENV === 'development') {
//   // 개발 환경에서만 import
//   import('./mocks/browser').then(({ worker }) => {
//     worker.start({ onUnhandledRequest: 'bypass', quiet: false });
//   });
// }

function App() {
  // const { isBottomSheetOpen = false, selectedPlaceId = null, closeBottomSheet = true} = useStore();
  const { isBottomSheetOpen, selectedPlaceId, closeBottomSheet, openBottomSheet } = useStore();
  const { placeId } = useParams(); // URL에서 placeId 추출
  const navigate = useNavigate();
  const location = useLocation();

  // URL 변경에 따라 상태 업데이트
  useEffect(() => {
    if (placeId) {
      openBottomSheet(placeId);
    } else {
      closeBottomSheet();
    }
  }, [placeId, openBottomSheet, closeBottomSheet]);

  // 바텀시트 열림 상태 변경에 따라 URL 업데이트
  useEffect(() => {
    if (isBottomSheetOpen && selectedPlaceId) {
      navigate(`/places/${selectedPlaceId}`);
    } else if (!isBottomSheetOpen && location.pathname === `/places/${selectedPlaceId}`) {
      navigate('/');
    }
  }, [isBottomSheetOpen, selectedPlaceId, location.pathname, navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/places/:placeId" element={<Home />} />
        <Route path="places/:placeId/upload-pung" element={<UploadPung />} />
      </Routes>
      <Map />
      <Navbar />
    </>
  );
}

export default App;
