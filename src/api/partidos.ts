import apiClient from './index';
import type { 
  Partido, 
  ProposeTimePayload, 
  AcceptTimePayload, 
  ReportResultPayload,
  CreatePartidoPayload,
  UpdatePartidoPayload
} from '../types';

export const partidosApi = {
  async getPartidos(query?: { categoria_id?: number; torneo_id?: number }): Promise<Partido[]> {
    const response = await apiClient.get<Partido[]>('/partidos', { params: query });
    return response.data;
  },

  async getPartidoById(id: number): Promise<Partido> {
    const response = await apiClient.get<Partido>(`/partidos/${id}`);
    return response.data;
  },

  async createPartido(payload: CreatePartidoPayload): Promise<Partido> {
    const response = await apiClient.post<Partido>('/admin/partidos', payload);
    return response.data;
  },

  async updatePartido(id: number, payload: UpdatePartidoPayload): Promise<Partido> {
    const response = await apiClient.put<Partido>(`/admin/partidos/${id}`, payload);
    return response.data;
  },

  async deletePartido(id: number): Promise<void> {
    await apiClient.delete(`/admin/partidos/${id}`);
  },

  async proposeMatchTime(partidoId: number, payload: ProposeTimePayload): Promise<void> {
    await apiClient.post(`/player/partidos/${partidoId}/propose-time`, payload);
  },

  async acceptMatchTime(partidoId: number, payload: AcceptTimePayload): Promise<void> {
    await apiClient.post(`/player/partidos/${partidoId}/accept-time`, payload);
  },

  async reportMatchResult(partidoId: number, payload: ReportResultPayload): Promise<void> {
    await apiClient.post(`/player/partidos/${partidoId}/report-result`, payload);
  },

  async approveResult(partidoId: number): Promise<void> {
    await apiClient.put(`/admin/partidos/${partidoId}/approve-result`);
  }
};