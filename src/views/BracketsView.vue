<template>
  <div class="py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold copa-litoral-text mb-4">Cuadros y Resultados</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">Consulta los cuadros de competencia y resultados por categoría</p>
      </div>

      <!-- Category Filter -->
      <div class="mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filtrar por Categoría</h3>
          <div class="flex flex-wrap justify-center gap-3">
            <button
              @click="selectedCategory = null"
              class="px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
              :class="selectedCategory === null 
                ? 'bg-azul-marino-600 text-white shadow-lg' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'"
            >
              <span class="flex items-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7l2 2-2 2m2-2H9m10 0V9a2 2 0 00-2-2M5 21l2-2-2-2m2 2H3m2 0v-4a2 2 0 012-2"></path>
                </svg>
                <span>Todas las Categorías</span>
              </span>
            </button>
            <button
              v-for="category in categories"
              :key="category.id"
              @click="selectedCategory = category.id"
              class="px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
              :class="selectedCategory === category.id 
                ? 'bg-azul-marino-600 text-white shadow-lg' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'"
            >
              <span class="flex items-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
                <span>{{ category.nombre }}</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-16">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-azul-marino-100 dark:bg-azul-marino-900 rounded-full mb-4">
          <LoadingSpinner />
        </div>
        <p class="text-gray-600 dark:text-gray-400">Cargando cuadros...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredCategories.length === 0" class="text-center py-16">
        <div class="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No hay categorías disponibles</h3>
        <p class="text-gray-600 dark:text-gray-400">Las categorías se mostrarán aquí una vez que estén configuradas.</p>
      </div>

      <!-- Brackets by Category -->
      <div v-else class="space-y-12">
        <div v-for="category in filteredCategories" :key="category.id" class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <!-- Category Header -->
          <div class="bg-gradient-to-r from-azul-marino-600 to-naranja-arcilla-500 px-8 py-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                </div>
                <div>
                  <h2 class="text-2xl md:text-3xl font-bold text-white">{{ category.nombre }}</h2>
                  <p class="text-white/80">{{ getCategoryStats(category.id) }}</p>
                </div>
              </div>
              <div class="text-right">
                <div class="text-white/80 text-sm">Partidos</div>
                <div class="text-2xl font-bold text-white">{{ getMatchCount(category.id) }}</div>
              </div>
            </div>
          </div>
          
          <!-- Phase Filter -->
          <div class="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filtrar por Fase</h3>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="phase in getPhases(category.id)"
                :key="`${category.id}-${phase}`"
                @click="togglePhase(category.id, phase)"
                class="px-4 py-2 text-sm rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                :class="selectedPhases[category.id]?.includes(phase)
                  ? 'bg-naranja-arcilla-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'"
              >
                <span class="flex items-center space-x-2">
                  <span>{{ phase }}</span>
                  <span class="bg-white/20 text-xs px-2 py-1 rounded-full">
                    {{ getPhaseMatchCount(category.id, phase) }}
                  </span>
                </span>
              </button>
            </div>
          </div>

          <!-- Matches Grid -->
          <div class="p-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <MatchCard
                v-for="match in getFilteredMatches(category.id)"
                :key="match.id"
                :match="match"
                :show-player-contact="authStore.isAuthenticated"
                @propose-time="handleProposeTime"
                @report-result="handleReportResult"
              />
            </div>

            <!-- Empty matches state -->
            <div v-if="getFilteredMatches(category.id).length === 0" class="text-center py-12">
              <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No hay partidos en esta categoría</h3>
              <p class="text-gray-600 dark:text-gray-400">Los partidos aparecerán aquí una vez que sean programados.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mt-12 bg-gradient-to-r from-azul-marino-600 to-naranja-arcilla-500 rounded-2xl p-8 text-center text-white">
        <h3 class="text-2xl font-bold mb-4">¿Necesitas coordinar un partido?</h3>
        <p class="text-lg mb-6 opacity-90">Agenda tu próximo partido o reporta el resultado de uno ya jugado</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/agenda" class="bg-white text-azul-marino-900 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
            Agendar Partido
          </router-link>
          <a href="https://wa.me/56912345678" target="_blank" class="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-azul-marino-900 transition-colors">
            WhatsApp Organizadores
          </a>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <ProposeTimeModal
      v-if="showProposeTimeModal"
      :match="selectedMatch"
      @close="showProposeTimeModal = false"
      @submit="submitProposeTime"
    />

    <ReportResultModal
      v-if="showReportResultModal"
      :match="selectedMatch"
      @close="showReportResultModal = false"
      @submit="submitReportResult"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import { useTournamentStore } from '../stores/tournament';
import { useAuthStore } from '../stores/auth';
import { partidosApi } from '../api/partidos';
import { useToast } from 'vue-toastification';
import MatchCard from '../components/MatchCard.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import ProposeTimeModal from '../components/ProposeTimeModal.vue';
import ReportResultModal from '../components/ReportResultModal.vue';
import type { Partido, ProposeTimePayload, ReportResultPayload } from '../types';

const tournamentStore = useTournamentStore();
const authStore = useAuthStore();
const toast = useToast();

const selectedCategory = ref<number | null>(null);
const selectedPhases = reactive<Record<number, string[]>>({});
const loading = ref(false);

const showProposeTimeModal = ref(false);
const showReportResultModal = ref(false);
const selectedMatch = ref<Partido | null>(null);

const categories = computed(() => tournamentStore.categories);
const matches = computed(() => tournamentStore.matches);

const filteredCategories = computed(() => {
  if (selectedCategory.value === null) {
    return categories.value;
  }
  return categories.value.filter(cat => cat.id === selectedCategory.value);
});

const getPhases = (categoryId: number) => {
  const categoryMatches = matches.value.filter(match => match.categoria_id === categoryId);
  const phases = [...new Set(categoryMatches.map(match => match.fase))];
  return phases.sort();
};

const getMatchCount = (categoryId: number) => {
  return matches.value.filter(match => match.categoria_id === categoryId).length;
};

const getPhaseMatchCount = (categoryId: number, phase: string) => {
  return matches.value.filter(match => match.categoria_id === categoryId && match.fase === phase).length;
};

const getCategoryStats = (categoryId: number) => {
  const categoryMatches = matches.value.filter(match => match.categoria_id === categoryId);
  const completed = categoryMatches.filter(match => match.estado === 'finalizado').length;
  const total = categoryMatches.length;
  return `${completed}/${total} partidos completados`;
};

const togglePhase = (categoryId: number, phase: string) => {
  if (!selectedPhases[categoryId]) {
    selectedPhases[categoryId] = [];
  }
  
  const phases = selectedPhases[categoryId];
  const index = phases.indexOf(phase);
  
  if (index === -1) {
    phases.push(phase);
  } else {
    phases.splice(index, 1);
  }
};

const getFilteredMatches = (categoryId: number) => {
  let categoryMatches = matches.value.filter(match => match.categoria_id === categoryId);
  
  if (selectedPhases[categoryId] && selectedPhases[categoryId].length > 0) {
    categoryMatches = categoryMatches.filter(match => 
      selectedPhases[categoryId].includes(match.fase)
    );
  }
  
  return categoryMatches.sort((a, b) => {
    // Sort by phase order, then by date
    const phaseOrder = ['Primera Ronda', 'Segunda Ronda', 'Octavos de Final', 'Cuartos de Final', 'Semifinal', 'Final'];
    const aPhaseIndex = phaseOrder.indexOf(a.fase);
    const bPhaseIndex = phaseOrder.indexOf(b.fase);
    
    if (aPhaseIndex !== bPhaseIndex) {
      return aPhaseIndex - bPhaseIndex;
    }
    
    if (a.fecha_agendada && b.fecha_agendada) {
      return new Date(a.fecha_agendada).getTime() - new Date(b.fecha_agendada).getTime();
    }
    
    return a.id - b.id;
  });
};

const handleProposeTime = (match: Partido) => {
  selectedMatch.value = match;
  showProposeTimeModal.value = true;
};

const handleReportResult = (match: Partido) => {
  selectedMatch.value = match;
  showReportResultModal.value = true;
};

const submitProposeTime = async (payload: ProposeTimePayload) => {
  if (!selectedMatch.value) return;
  
  try {
    await partidosApi.proposeMatchTime(selectedMatch.value.id, payload);
    await tournamentStore.fetchMatches();
    toast.success('Propuesta de horario enviada correctamente');
    showProposeTimeModal.value = false;
  } catch (error: any) {
    toast.error(error.response?.data?.error || 'Error al proponer horario');
  }
};

const submitReportResult = async (payload: ReportResultPayload) => {
  if (!selectedMatch.value) return;
  
  try {
    await partidosApi.reportMatchResult(selectedMatch.value.id, payload);
    await tournamentStore.fetchMatches();
    toast.success('Resultado reportado correctamente');
    showReportResultModal.value = false;
  } catch (error: any) {
    toast.error(error.response?.data?.error || 'Error al reportar resultado');
  }
};

onMounted(async () => {
  loading.value = true;
  await tournamentStore.loadInitialData();
  loading.value = false;
});
</script>