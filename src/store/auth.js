import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      userInfo: null,

      setAccessToken: (token) => set({ accessToken: token, isAuthenticated: !!token }),
      setUserInfo: (userInfo) => set({ userInfo }),
      clearAuth: () => set({ accessToken: null, userInfo: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    },
  ),
);

export default useAuthStore;
