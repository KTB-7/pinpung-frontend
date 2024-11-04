import './App.css';
import './styles/responsive.css';
import useStore from './store';
import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import BottomSheet from './components/BottomSheet';
import UploadPung from './pages/UploadPung';

function App() {
  const { isBottomSheetOpen, selectedPlaceId, closeBottomSheet } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   if (isBottomSheetOpen && selectedPlaceId) {
  //     navigate(`/places/${selectedPlaceId}`);
  //   } else if (!isBottomSheetOpen && location.pathname.startsWith('/places')) {
  //     // 바텀시트 닫혔다면 홈으로 리디렉트. 이거 로직 맞는지 더 제대로 디버깅 필요
  //     navigate('/');
  //   }
  // }, [isBottomSheetOpen, selectedPlaceId, location.pathname, navigate]);

  useEffect(() => {
    if (isBottomSheetOpen && selectedPlaceId) {
      // BottomSheet가 열리면 해당 장소의 상세 페이지로 이동
      if (!location.pathname.includes('upload-pung')) {
        navigate(`/places/${selectedPlaceId}`);
      }
    } else if (!isBottomSheetOpen && location.pathname === `/places/${selectedPlaceId}`) {
      // BottomSheet가 닫히고 특정 장소 페이지에 있을 경우 홈으로 리디렉션
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
      <BottomSheet
        isOpen={isBottomSheetOpen}
        placeId={selectedPlaceId}
        onClose={closeBottomSheet}
      />
    </>
  );
}

export default App;
