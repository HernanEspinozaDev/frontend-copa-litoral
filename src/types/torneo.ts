export interface Torneo {
  id: number;
  nombre: string;
  anio: number;
  fecha_inicio: string;
  fecha_fin: string;
  foto_url?: string;
  frase_destacada?: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateTorneoPayload {
  nombre: string;
  anio: number;
  fecha_inicio: string;
  fecha_fin: string;
  foto_url?: string;
  frase_destacada?: string;
  activo: boolean;
}

export interface UpdateTorneoPayload extends Partial<CreateTorneoPayload> {}