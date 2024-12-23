/* Navbar와 BottomSheet 상태관리 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      //메모리(렘) 상태
      userLocation: null,
      setUserLocation: (location) => set({ userLocation: location }),
      moveToLocation: null,
      setMoveToLocation: (location) => set({ moveToLocation: location }),
      mapRect: null,
      setMapRect: (rect) => set({ mapRect: rect }),
      mapLevel: null,
      setMapLevel: (level) => set({ mapLevel: level }),

      showMap: true,
      setShowMap: (show) => set({ showMap: show }),
      showNavbar: true,
      setShowNavbar: (show) => set({ showNavbar: show }),
      selectedPlaceId: null,
      setSelectedPlaceId: (placeId) => set({ selectedPlaceId: placeId }),
      selectedPlaceName: '',
      setSelectedPlaceName: (placeName) => set({ selectedPlaceName: placeName }),
      selectedNavbar: 'home',
      setSelectedNavbar: (icon) => set({ selectedNavbar: icon }),
      searchResults: [],
      setSearchResults: (results) => set({ searchResults: results }),
    }),
    // {
    //   name: 'app-storage',
    //   getStorage: () => localStorage,
    //   partialize: (state) => ({ userLocation: state.userLocation, mapRect: state.mapRect }),
    // },
  ),
);

// useStore.subscribe((state) => {
//   console.log('현재 Zustand moveToLocation:', state.moveToLocation);
// });

export default useStore;
