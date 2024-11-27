import create from 'zustand';

const useMapStore = create((set) => ({
  center: { lng, lat },
  rect: { swLng, swLat, neLng, neLat },
  zoom: 3,

  setCenter: (newCenter) => set({ center: newCenter }),
  setRect: (newRect) => set({ rect: newRect }),
  setZoom: (newZoom) => set({ zoom: newZoom }),
}));
