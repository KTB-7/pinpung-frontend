/* Navbar와 BottomSheet 상태관리 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      //persistent 상태
      center: null,
      setCenter: (location) => set({ center: location }),
      mapRect: null,
      setMapRect: (rect) => set({ mapRect: rect }),

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
      query: '',
      setQuery: (query) => set({ query }),
    }),
    {
      name: 'app-storage',
      getStorage: () => localStorage,
      partialize: (state) => ({ center: state.center, mapRect: state.mapRect }),
    },
  ),
);

export default useStore;
