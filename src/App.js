import './App.css';
import './styles/responsive.css';
import useStore from './store';
import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import BottomSheet from './components/BottomSheet';

function App() {
  const { isBottomSheetOpen, selectedPlaceId, closeBottomSheet } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isBottomSheetOpen && selectedPlaceId) {
      navigate(`/places/${selectedPlaceId}`);
    } else if (!isBottomSheetOpen && location.pathname.startsWith('/places')) {
      // 바텀시트 닫혔다면 홈으로 리디렉트. 이거 로직 맞는지 더 제대로 디버깅 필요
      navigate('/');
    }
  }, [isBottomSheetOpen, selectedPlaceId, location.pathname, navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/places/:placeId" element={<Home />} />
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
