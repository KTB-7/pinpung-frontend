/* Navbar와 BottomSheet 상태관리 */

import { create } from 'zustand';

const useStore = create((set) => ({
  showNavbar: true,
  selectedPlaceId: null,
  selectedPlaceName: '',

  setShowNavbar: (show) => set({ showNavbar: show }),
  setSelectedPlaceName: (placeName) => set({ selectedPlaceName: placeName }),
}));

export default useStore;
