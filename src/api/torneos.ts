import apiClient from './index';
import type { Torneo, CreateTorneoPayload, UpdateTorneoPayload } from '../types';

export const torneosApi = {
  async getTorneos(): Promise<Torneo[]> {
    const response = await apiClient.get<Torneo[]>('/torneos');
    return response.data;
  },

  async getCurrentTorneo(): Promise<Torneo> {
    const response = await apiClient.get<Torneo>('/torneos/current');
    return response.data;
  },

  async getTorneoById(id: number): Promise<Torneo> {
    const response = await apiClient.get<Torneo>(`/torneos/${id}`);
    return response.data;
  },

  async createTorneo(payload: CreateTorneoPayload): Promise<Torneo> {
    const response = await apiClient.post<Torneo>('/admin/torneos', payload);
    return response.data;
  },

  async updateTorneo(id: number, payload: UpdateTorneoPayload): Promise<Torneo> {
    const response = await apiClient.put<Torneo>(`/admin/torneos/${id}`, payload);
    return response.data;
  },

  async deleteTorneo(id: number): Promise<void> {
    await apiClient.delete(`/admin/torneos/${id}`);
  }
};