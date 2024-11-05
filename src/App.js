import './App.css';
import './styles/responsive.css';
import useStore from './store';
import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import BottomSheet from './components/BottomSheet';
import UploadPung from './pages/UploadPung';

function App() {
  const { isBottomSheetOpen = false, selectedPlaceId = null, closeBottomSheet = true } = useStore();

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
    // 로직이 괴상하고 뭔가 억지스럽다고 생각함.. 수정 필요
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
      <BottomSheet
        isOpen={isBottomSheetOpen}
        placeId={selectedPlaceId}
        onClose={closeBottomSheet}
      />
    </>
  );
}

export default App;
