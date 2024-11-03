/* NavBar와 BottomSheet 상태관리 */

import create from 'zustand';

const useStore = create((set) => ({
  showNavBar: true,
  isBottomSheetOpen: false,
  selectedPlaceId: null,

  setShowNavBar: (show) => set({ showNavBar: show }),
  openBottomSheet: (placeId) => set({ isBottomSheetOpen: true, selectedPlaceId: placeId }),
  closeBottomSheet: () => set({ isBottomSheetOpen: false, selectedPlaceId: null }),
}));

export default useStore;
