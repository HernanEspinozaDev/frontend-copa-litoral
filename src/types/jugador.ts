export interface Jugador {
  id: number;
  nombre: string;
  apellido: string;
  telefono_wsp?: string;
  contacto_visible_en_web: boolean;
  categoria_id?: number;
  club?: string;
  estado_participacion: string;
  created_at: string;
  updated_at: string;
  CategoriaNombre?: string;
}

export interface CreateJugadorPayload {
  nombre: string;
  apellido: string;
  telefono_wsp?: string;
  contacto_visible_en_web: boolean;
  categoria_id?: number;
  club?: string;
  estado_participacion: string;
}

export interface UpdateJugadorPayload extends Partial<CreateJugadorPayload> {}