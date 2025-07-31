import apiClient from './index';
import type { Categoria, CreateCategoriaPayload, UpdateCategoriaPayload } from '../types';

export const categoriasApi = {
  async getCategorias(): Promise<Categoria[]> {
    const response = await apiClient.get<Categoria[]>('/categorias');
    return response.data;
  },

  async getCategoriaById(id: number): Promise<Categoria> {
    const response = await apiClient.get<Categoria>(`/categorias/${id}`);
    return response.data;
  },

  async createCategoria(payload: CreateCategoriaPayload): Promise<Categoria> {
    const response = await apiClient.post<Categoria>('/admin/categorias', payload);
    return response.data;
  },

  async updateCategoria(id: number, payload: UpdateCategoriaPayload): Promise<Categoria> {
    const response = await apiClient.put<Categoria>(`/admin/categorias/${id}`, payload);
    return response.data;
  },

  async deleteCategoria(id: number): Promise<void> {
    await apiClient.delete(`/admin/categorias/${id}`);
  }
};