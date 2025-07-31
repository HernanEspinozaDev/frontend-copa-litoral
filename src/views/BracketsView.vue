<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Cuadros y Resultados</h1>
        <p class="text-gray-600 dark:text-gray-400">Consulta los cuadros de competencia y resultados por categoría</p>
      </div>

      <!-- Category Filter -->
      <div class="mb-8">
        <div class="flex flex-wrap justify-center gap-2">
          <button
            @click="selectedCategory = null"
            class="px-4 py-2 rounded-lg font-medium transition-colors"
            :class="selectedCategory === null 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'"
          >
            Todas las Categorías
          </button>
          <button
            v-for="category in categories"
            :key="category.id"
            @click="selectedCategory = category.id"
            class="px-4 py-2 rounded-lg font-medium transition-colors"
            :class="selectedCategory === category.id 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'"
          >
            {{ category.nombre }}
          </button>
        </div>
      </div>

      <!-- Brackets by Category -->
      <div v-if="loading" class="text-center py-8">
        <LoadingSpinner />
      </div>

      <div v-else-if="filteredCategories.length === 0" class="text-center py-8">
        <p class="text-gray-500 dark:text-gray-400">No hay categorías disponibles</p>
      </div>

      <div v-else class="space-y-12">
        <div v-for="category in filteredCategories" :key="category.id">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">{{ category.nombre }}</h2>
          
          <!-- Phase Filter -->
          <div class="mb-6">
            <div class="flex flex-wrap gap-2">
              <button
                v-for="phase in getPhases(category.id)"
                :key="`${category.id}-${phase}`"
                @click="togglePhase(category.id, phase)"
                class="px-3 py-1 text-sm rounded-lg font-medium transition-colors"
                :class="selectedPhases[category.id]?.includes(phase)
                  ? 'bg-secondary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'"
              >
                {{ phase }}
              </button>
            </div>
          </div>

          <!-- Matches Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MatchCard
              v-for="match in getFilteredMatches(category.id)"
              :key="match.id"
              :match="match"
              @propose-time="handleProposeTime"
              @report-result="handleReportResult"
            />
          </div>

          <div v-if="getFilteredMatches(category.id).length === 0" class="text-center py-8">
            <p class="text-gray-500 dark:text-gray-400">No hay partidos en esta categoría</p>
          </div>
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
  
  return categoryMatches.sort((a, b) => a.fase.localeCompare(b.fase));
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