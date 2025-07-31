export interface Partido {
  id: number;
  torneo_id: number;
  categoria_id: number;
  jugador1_id: number;
  jugador2_id: number;
  fase: string;
  fecha_agendada?: string;
  hora_agendada?: string;
  estado: string;
  resultado_sets_j1?: number;
  resultado_sets_j2?: number;
  ganador_id?: number;
  perdedor_id?: number;
  resultado_aprobado: boolean;
  created_at: string;
  updated_at: string;
  Jugador1Nombre?: string;
  Jugador2Nombre?: string;
  CategoriaNombre?: string;
}

export interface SetPartido {
  id: number;
  partido_id: number;
  set_numero: number;
  games_j1: number;
  games_j2: number;
  ganador_set: number;
}

export interface ProposeTimePayload {
  fecha_agendada: string;
  hora_agendada: string;
}

export interface AcceptTimePayload {
  acepta: boolean;
}

export interface ReportResultPayload {
  resultado_sets_j1: number;
  resultado_sets_j2: number;
  sets: Array<{
    set_numero: number;
    games_j1: number;
    games_j2: number;
  }>;
}

export interface CreatePartidoPayload {
  torneo_id: number;
  categoria_id: number;
  jugador1_id: number;
  jugador2_id: number;
  fase: string;
}

export interface UpdatePartidoPayload extends Partial<CreatePartidoPayload> {
  fecha_agendada?: string;
  hora_agendada?: string;
  estado?: string;
}