/* Navbar와 BottomSheet 상태관리 */

import { create } from 'zustand';

const useStore = create((set) => ({
  showMap: true,
  showNavbar: true,
  selectedPlaceId: null,
  selectedPlaceName: '',
  selectedNavbar: 'home',
  center: null,
  mapRect: null,

  setShowMap: (show) => set({ showMap: show }),
  setShowNavbar: (show) => set({ showNavbar: show }),
  setSelectedPlaceId: (placeId) => set({ selectedPlaceId: placeId }),
  setSelectedPlaceName: (placeName) => set({ selectedPlaceName: placeName }),
  setSelectedNavbar: (icon) => set({ selectedNavbar: icon }),
  setCenter: (location) => set({ center: location }),
  setMapRect: (rect) => set({ mapRect: rect }),
}));

export default useStore;
