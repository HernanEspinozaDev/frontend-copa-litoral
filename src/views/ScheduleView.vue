<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Agenda de Partidos</h1>
        <p class="text-gray-600 dark:text-gray-400">Consulta los horarios programados y propón nuevos horarios</p>
      </div>

      <!-- Week Navigation -->
      <div class="flex justify-center items-center mb-8">
        <button
          @click="previousWeek"
          class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <div class="mx-4 text-center">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ formatWeekRange(currentWeekStart) }}
          </h2>
        </div>
        <button
          @click="nextWeek"
          class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      <!-- Calendar Grid -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <!-- Days of week header -->
        <div class="grid grid-cols-7 bg-gray-50 dark:bg-gray-900">
          <div
            v-for="day in daysOfWeek"
            :key="day"
            class="px-4 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700 last:border-r-0"
          >
            {{ day }}
          </div>
        </div>

        <!-- Calendar body -->
        <div class="grid grid-cols-7 divide-x divide-gray-200 dark:divide-gray-700">
          <div
            v-for="date in weekDates"
            :key="date.toISOString()"
            class="min-h-[200px] p-2"
            :class="{
              'bg-blue-50 dark:bg-blue-900/20': isToday(date),
              'bg-gray-50 dark:bg-gray-900': date.getMonth() !== currentWeekStart.getMonth()
            }"
          >
            <div class="text-sm font-medium text-gray-900 dark:text-white mb-2">
              {{ date.getDate() }}
            </div>
            
            <!-- Matches for this day -->
            <div class="space-y-1">
              <div
                v-for="match in getMatchesForDate(date)"
                :key="match.id"
                class="bg-primary-100 dark:bg-primary-900/50 rounded p-2 text-xs cursor-pointer hover:bg-primary-200 dark:hover:bg-primary-900/70 transition-colors"
                @click="openMatchDetails(match)"
              >
                <div class="font-medium text-primary-800 dark:text-primary-200">
                  {{ match.hora_agendada || 'Sin hora' }}
                </div>
                <div class="text-primary-600 dark:text-primary-300 truncate">
                  {{ match.Jugador1Nombre }} vs {{ match.Jugador2Nombre }}
                </div>
                <div class="text-primary-500 dark:text-primary-400">
                  {{ match.CategoriaNombre }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming matches list -->
      <div class="mt-12">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Próximos Partidos</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MatchCard
            v-for="match in upcomingMatches"
            :key="match.id"
            :match="match"
            @propose-time="handleProposeTime"
            @report-result="handleReportResult"
          />
        </div>
      </div>
    </div>

    <!-- Match Details Modal -->
    <Modal v-if="showMatchDetails" @close="showMatchDetails = false">
      <div v-if="selectedMatch" class="p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Detalles del Partido</h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Categoría</label>
            <p class="text-gray-900 dark:text-white">{{ selectedMatch.CategoriaNombre }}</p>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Jugador 1</label>
              <p class="text-gray-900 dark:text-white">{{ selectedMatch.Jugador1Nombre }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Jugador 2</label>
              <p class="text-gray-900 dark:text-white">{{ selectedMatch.Jugador2Nombre }}</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha</label>
              <p class="text-gray-900 dark:text-white">
                {{ selectedMatch.fecha_agendada ? formatDate(selectedMatch.fecha_agendada) : 'Sin fecha' }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Hora</label>
              <p class="text-gray-900 dark:text-white">{{ selectedMatch.hora_agendada || 'Sin hora' }}</p>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Estado</label>
            <span 
              class="inline-block px-2 py-1 text-xs rounded-full font-medium"
              :class="getStatusClass(selectedMatch.estado)"
            >
              {{ selectedMatch.estado }}
            </span>
          </div>

          <!-- Action buttons for players -->
          <div v-if="authStore.isPlayer" class="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              v-if="canProposeTime(selectedMatch)"
              @click="handleProposeTime(selectedMatch)"
              class="btn-primary"
            >
              Proponer Horario
            </button>
            <button
              v-if="canReportResult(selectedMatch)"
              @click="handleReportResult(selectedMatch)"
              class="btn-secondary"
            >
              Reportar Resultado
            </button>
          </div>
        </div>
      </div>
    </Modal>

    <!-- Other modals -->
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
import { ref, computed, onMounted } from 'vue';
import { useTournamentStore } from '../stores/tournament';
import { useAuthStore } from '../stores/auth';
import { partidosApi } from '../api/partidos';
import { useToast } from 'vue-toastification';
import MatchCard from '../components/MatchCard.vue';
import Modal from '../components/Modal.vue';
import ProposeTimeModal from '../components/ProposeTimeModal.vue';
import ReportResultModal from '../components/ReportResultModal.vue';
import type { Partido, ProposeTimePayload, ReportResultPayload } from '../types';

const tournamentStore = useTournamentStore();
const authStore = useAuthStore();
const toast = useToast();

const currentWeekStart = ref(getWeekStart(new Date()));
const showMatchDetails = ref(false);
const showProposeTimeModal = ref(false);
const showReportResultModal = ref(false);
const selectedMatch = ref<Partido | null>(null);

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const matches = computed(() => tournamentStore.matches);

const weekDates = computed(() => {
  const dates = [];
  const start = new Date(currentWeekStart.value);
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    dates.push(date);
  }
  
  return dates;
});

const upcomingMatches = computed(() => {
  const now = new Date();
  return matches.value
    .filter(match => {
      if (!match.fecha_agendada) return false;
      const matchDate = new Date(match.fecha_agendada);
      return matchDate >= now && match.estado !== 'finalizado';
    })
    .sort((a, b) => new Date(a.fecha_agendada!).getTime() - new Date(b.fecha_agendada!).getTime())
    .slice(0, 9);
});

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday as first day
  return new Date(d.setDate(diff));
}

function isToday(date: Date): boolean {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

function formatWeekRange(weekStart: Date): string {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  
  return `${weekStart.getDate()} - ${weekEnd.getDate()} de ${weekEnd.toLocaleDateString('es-CL', { month: 'long', year: 'numeric' })}`;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('es-CL');
}

function previousWeek(): void {
  const newStart = new Date(currentWeekStart.value);
  newStart.setDate(newStart.getDate() - 7);
  currentWeekStart.value = newStart;
}

function nextWeek(): void {
  const newStart = new Date(currentWeekStart.value);
  newStart.setDate(newStart.getDate() + 7);
  currentWeekStart.value = newStart;
}

function getMatchesForDate(date: Date): Partido[] {
  return matches.value.filter(match => {
    if (!match.fecha_agendada) return false;
    const matchDate = new Date(match.fecha_agendada);
    return matchDate.toDateString() === date.toDateString();
  });
}

function openMatchDetails(match: Partido): void {
  selectedMatch.value = match;
  showMatchDetails.value = true;
}

function getStatusClass(status: string): string {
  switch (status) {
    case 'programado':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'en_curso':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'finalizado':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'pendiente':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
}

function canProposeTime(match: Partido): boolean {
  return match.estado === 'pendiente' || !match.fecha_agendada;
}

function canReportResult(match: Partido): boolean {
  return match.estado === 'programado' && !!match.fecha_agendada;
}

const handleProposeTime = (match: Partido) => {
  selectedMatch.value = match;
  showMatchDetails.value = false;
  showProposeTimeModal.value = true;
};

const handleReportResult = (match: Partido) => {
  selectedMatch.value = match;
  showMatchDetails.value = false;
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
  await tournamentStore.loadInitialData();
});
</script>