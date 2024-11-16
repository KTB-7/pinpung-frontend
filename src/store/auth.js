import { create } from 'zustand';

const useAuthStore = create((set) => ({
  accessToken: null,
  userInfo: null,
  isAuthenticated: false,

  setAccessToken: (token) => set({ accessToken: token, isAuthenticated: !!token }),
  setUserInfo: (userInfo) => set({ userInfo }),
  clearAuth: () => set({ accessToken: null, userInfo: null, isAuthenticated: false }),
}));

export default useAuthStore;
