import { create } from 'zustand';

const useAuthStore = create((set) => ({
  accessToken: null,
  isAuthenticated: false,

  setAccessToken: (token) => {
    set({ accessToken: token });
    if (token) {
      localStorage.setItem('accessToken', token);
    } else {
      localStorage.removeItem('accessToken');
    }
  },

  clearAuth: () => set({ accessToken: null, isAuthenticated: false }),
}));

export default useAuthStore;
