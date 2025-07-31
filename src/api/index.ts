import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosError } from 'axios';
import { useAuthStore } from '../stores/auth';
import router from '../router';

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor para añadir token JWT
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor para manejar errores HTTP
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      const authStore = useAuthStore();
      authStore.logout();
      router.push('/login');
    } else if (error.response?.status === 403) {
      // Sin permisos
      router.push('/');
    }
    return Promise.reject(error);
  }
);

export default apiClient;