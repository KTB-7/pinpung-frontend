/* NavBar와 BottomSheet 상태관리 */

import { create } from 'zustand';

const useStore = create((set) => ({
  showNavBar: true,
  isBottomSheetOpen: false,
  selectedPlaceId: null,
  selectedPlaceName: '',

  setShowNavBar: (show) => set({ showNavBar: show }),
  openBottomSheet: (placeId) => set({ isBottomSheetOpen: true, selectedPlaceId: placeId }),
  closeBottomSheet: () => set({ isBottomSheetOpen: false, selectedPlaceId: null }),
  setSelectedPlaceName: (placeName) => set({ selectedPlaceName: placeName }),
}));

export default useStore;
