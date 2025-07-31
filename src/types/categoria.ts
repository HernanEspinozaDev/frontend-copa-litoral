export interface Categoria {
  id: number;
  nombre: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCategoriaPayload {
  nombre: string;
}

export interface UpdateCategoriaPayload extends Partial<CreateCategoriaPayload> {}