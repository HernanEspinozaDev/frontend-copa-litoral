<template>
  <div>
    <!-- Hero Section -->
    <section 
      class="relative copa-litoral-gradient text-white py-20"
      :style="currentTournament?.foto_url ? `background-image: linear-gradient(rgba(59, 130, 246, 0.8), rgba(29, 78, 216, 0.8)), url(${currentTournament.foto_url})` : ''"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-4">
          {{ currentTournament?.nombre || 'Copa Litoral' }}
        </h1>
        <p class="text-xl md:text-2xl mb-8 opacity-90">
          {{ currentTournament?.frase_destacada || 'El torneo de tenis más prestigioso de la región' }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div class="bg-white/20 backdrop-blur rounded-lg px-6 py-3">
            <span class="text-sm opacity-75">Inicio:</span>
            <div class="font-semibold text-lg">
              {{ formatDate(currentTournament?.fecha_inicio) }}
            </div>
          </div>
          <div class="bg-white/20 backdrop-blur rounded-lg px-6 py-3">
            <span class="text-sm opacity-75">Finalización:</span>
            <div class="font-semibold text-lg">
              {{ formatDate(currentTournament?.fecha_fin) }}
            </div>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/cuadros" class="bg-white text-azul-marino-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Ver Cuadros y Resultados
          </router-link>
          <router-link to="/agenda" class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-azul-marino-900 transition-colors">
            Consultar Agenda
          </router-link>
        </div>
      </div>
    </section>

    <!-- Quick Stats -->
    <section class="py-16 bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div class="p-6">
            <div class="w-16 h-16 bg-azul-marino-100 dark:bg-azul-marino-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-azul-marino-900 dark:text-azul-marino-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold copa-litoral-text mb-2">{{ players.length }}</h3>
            <p class="text-gray-600 dark:text-gray-400">Jugadores Registrados</p>
          </div>
          <div class="p-6">
            <div class="w-16 h-16 bg-naranja-arcilla-100 dark:bg-naranja-arcilla-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-naranja-arcilla-500 dark:text-naranja-arcilla-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold copa-litoral-text mb-2">{{ categories.length }}</h3>
            <p class="text-gray-600 dark:text-gray-400">Categorías</p>
          </div>
          <div class="p-6">
            <div class="w-16 h-16 bg-naranja-arcilla-100 dark:bg-naranja-arcilla-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-naranja-arcilla-600 dark:text-naranja-arcilla-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold copa-litoral-text mb-2">{{ matches.length }}</h3>
            <p class="text-gray-600 dark:text-gray-400">Partidos Programados</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Matches -->
    <section class="py-16 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Últimos Resultados</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="match in recentMatches" 
            :key="match.id"
            class="card"
          >
            <div class="flex justify-between items-center mb-4">
              <span class="text-sm text-gray-500 dark:text-gray-400">{{ match.CategoriaNombre }}</span>
              <span class="text-sm font-medium text-primary-600 dark:text-primary-400">{{ match.fase }}</span>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="font-medium">{{ match.Jugador1Nombre }}</span>
                <span class="text-lg font-bold">{{ match.resultado_sets_j1 || 0 }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="font-medium">{{ match.Jugador2Nombre }}</span>
                <span class="text-lg font-bold">{{ match.resultado_sets_j2 || 0 }}</span>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(match.fecha_agendada) }}
              </span>
            </div>
          </div>
        </div>
        <div class="text-center mt-8">
          <router-link to="/cuadros" class="btn-primary">
            Ver Todos los Resultados
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useTournamentStore } from '../stores/tournament';

const tournamentStore = useTournamentStore();

const currentTournament = computed(() => tournamentStore.currentTournament);
const categories = computed(() => tournamentStore.categories);
const players = computed(() => tournamentStore.players);
const matches = computed(() => tournamentStore.matches);

const recentMatches = computed(() => {
  return matches.value
    .filter(match => match.resultado_aprobado && match.ganador_id)
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 6);
});

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Por definir';
  return new Date(dateString).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

onMounted(async () => {
  await tournamentStore.loadInitialData();
});
</script>