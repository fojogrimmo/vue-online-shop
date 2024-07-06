import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isAdmin: JSON.parse(localStorage.getItem('isAdmin')) || false,
  }),
  actions: {
    login(user, token) {
      this.user = user;
      this.token = token;
      this.isAdmin = user.is_admin;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      localStorage.setItem('isAdmin', JSON.stringify(user.is_admin));
    },
    logout() {
      this.user = null;
      this.token = null;
      this.isAdmin = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
    },
  },
});