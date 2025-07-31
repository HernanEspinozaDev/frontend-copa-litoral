export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message: string;
}

export interface User {
  id: number;
  nombre_usuario: string;
  rol: string;
  created_at?: string;
  updated_at?: string;
}