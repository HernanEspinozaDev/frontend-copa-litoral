import apiClient from './index';
import type { Jugador, CreateJugadorPayload, UpdateJugadorPayload } from '../types';

export const jugadoresApi = {
  async getJugadores(categoryId?: number): Promise<Jugador[]> {
    const params = categoryId ? { categoria_id: categoryId } : {};
    const response = await apiClient.get<Jugador[]>('/jugadores', { params });
    return response.data;
  },

  async getJugadorById(id: number): Promise<Jugador> {
    const response = await apiClient.get<Jugador>(`/jugadores/${id}`);
    return response.data;
  },

  async createJugador(payload: CreateJugadorPayload): Promise<Jugador> {
    const response = await apiClient.post<Jugador>('/admin/jugadores', payload);
    return response.data;
  },

  async updateJugador(id: number, payload: UpdateJugadorPayload): Promise<Jugador> {
    const response = await apiClient.put<Jugador>(`/admin/jugadores/${id}`, payload);
    return response.data;
  },

  async deleteJugador(id: number): Promise<void> {
    await apiClient.delete(`/admin/jugadores/${id}`);
  }
};