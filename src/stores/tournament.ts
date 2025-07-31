import { defineStore } from 'pinia';
import { torneosApi } from '../api/torneos';
import { categoriasApi } from '../api/categorias';
import { jugadoresApi } from '../api/jugadores';
import { partidosApi } from '../api/partidos';
import type { Torneo, Categoria, Jugador, Partido } from '../types';

interface TournamentState {
  currentTournament: Torneo | null;
  categories: Categoria[];
  players: Jugador[];
  matches: Partido[];
  loading: boolean;
  error: string | null;
}

export const useTournamentStore = defineStore('tournament', {
  state: (): TournamentState => ({
    currentTournament: null,
    categories: [],
    players: [],
    matches: [],
    loading: false,
    error: null,
  }),

  getters: {
    getPlayersByCategory: (state) => (categoryId: number) => {
      return state.players.filter(player => player.categoria_id === categoryId);
    },

    getMatchesByCategory: (state) => (categoryId: number) => {
      return state.matches.filter(match => match.categoria_id === categoryId);
    },

    getMatchById: (state) => (matchId: number) => {
      return state.matches.find(match => match.id === matchId);
    },

    getMatchesByPhase: (state) => (categoryId: number, phase: string) => {
      return state.matches.filter(match => 
        match.categoria_id === categoryId && match.fase === phase
      );
    }
  },

  actions: {
    async fetchCurrentTournament() {
      this.loading = true;
      try {
        this.currentTournament = await torneosApi.getCurrentTorneo();
      } catch (error: any) {
        this.error = error.response?.data?.error || 'Error al cargar el torneo';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchCategories() {
      try {
        this.categories = await categoriasApi.getCategorias();
      } catch (error: any) {
        this.error = error.response?.data?.error || 'Error al cargar las categorías';
        throw error;
      }
    },

    async fetchPlayers() {
      try {
        this.players = await jugadoresApi.getJugadores();
      } catch (error: any) {
        this.error = error.response?.data?.error || 'Error al cargar los jugadores';
        throw error;
      }
    },

    async fetchMatches() {
      try {
        this.matches = await partidosApi.getPartidos();
      } catch (error: any) {
        this.error = error.response?.data?.error || 'Error al cargar los partidos';
        throw error;
      }
    },

    async updateMatch(matchId: number, payload: any) {
      try {
        const updatedMatch = await partidosApi.updatePartido(matchId, payload);
        const index = this.matches.findIndex(match => match.id === matchId);
        if (index !== -1) {
          this.matches[index] = updatedMatch;
        }
        return updatedMatch;
      } catch (error: any) {
        this.error = error.response?.data?.error || 'Error al actualizar el partido';
        throw error;
      }
    },

    async loadInitialData() {
      await Promise.all([
        this.fetchCurrentTournament(),
        this.fetchCategories(),
        this.fetchPlayers(),
        this.fetchMatches(),
      ]).catch(() => {
        // Los errores individuales ya se manejan en cada método
      });
    },

    clearError() {
      this.error = null;
    }
  }
});