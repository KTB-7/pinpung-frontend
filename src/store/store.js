/* Navbar와 BottomSheet 상태관리 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      //persistent 상태
      userLocation: null,
      setUserLocation: (location) => set({ userLocation: location }),
      bounds: null,
      setBounds: (rect) => set({ bounds: rect }),

      //메모리(렘) 상태
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
    {
      name: 'app-storage',
      getStorage: () => localStorage,
      partialize: (state) => ({ userLocation: state.userLocation, bounds: state.bounds }),
    },
  ),
);

export default useStore;
