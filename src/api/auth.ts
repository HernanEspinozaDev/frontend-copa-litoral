import apiClient from './index';
import type { AuthResponse, User, LoginPayload, RegisterPayload } from '../types';

export const authApi = {
  async login(username: string, password: string): Promise<AuthResponse> {
    const payload: LoginPayload = { nombre_usuario: username, password };
    const response = await apiClient.post<AuthResponse>('/login', payload);
    
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user_data', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  async register(userPayload: RegisterPayload): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/register', userPayload);
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  },

  async verifyToken(): Promise<User> {
    const response = await apiClient.get<{ user: User }>('/verify-token');
    return response.data.user;
  }
};