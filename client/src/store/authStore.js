import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || { name: 'Dr. Sterling', email: 'sterling@university.edu', role: 'Faculty Head' },
  isAuthenticated: !!localStorage.getItem('auth_token') || true,
  loading: false,
  error: null,

  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),

  login: (userData, token) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    set({ user: userData, isAuthenticated: true, error: null });
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false, error: null });
  },

  updateUser: (updatedUser) => {
    const newUser = { ...JSON.parse(localStorage.getItem('user')), ...updatedUser };
    localStorage.setItem('user', JSON.stringify(newUser));
    set({ user: newUser });
  }
}));
