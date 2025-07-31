import { defineStore } from 'pinia';
import { authApi } from '../api/auth';
import type { User } from '../types';
import router from '../router';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state): boolean => state.token !== null,
    isAdmin: (state): boolean => state.user?.rol === 'administrador',
    isPlayer: (state): boolean => state.user?.rol === 'jugador',
  },

  actions: {
    async login(username: string, password: string) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await authApi.login(username, password);
        this.token = response.token;
        this.user = response.user;
        
        // Redirigir según el rol
        if (this.isAdmin) {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } catch (error: any) {
        this.error = error.response?.data?.error || 'Error al iniciar sesión';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      authApi.logout();
      this.token = null;
      this.user = null;
      router.push('/login');
    },

    async checkAuth() {
      const token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('user_data');

      if (token && userData) {
        try {
          this.token = token;
          this.user = JSON.parse(userData);
          
          // Verificar que el token sigue siendo válido
          await authApi.verifyToken();
        } catch (error) {
          // Token inválido, limpiar datos
          this.logout();
        }
      }
    },

    clearError() {
      this.error = null;
    }
  }
});