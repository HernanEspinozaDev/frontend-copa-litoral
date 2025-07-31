export interface LoginPayload {
  nombre_usuario: string;
  password: string;
}

export interface RegisterPayload {
  nombre_usuario: string;
  password: string;
  rol: string;
}