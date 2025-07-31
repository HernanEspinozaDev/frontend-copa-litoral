<template>
  <div class="card">
    <div class="flex justify-between items-start mb-4">
      <div class="flex-1">
        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">
          {{ match.CategoriaNombre }} - {{ match.fase }}
        </div>
        <div class="font-medium text-gray-900 dark:text-white">
          {{ match.Jugador1Nombre }}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-300">
          vs
        </div>
        <div class="font-medium text-gray-900 dark:text-white">
          {{ match.Jugador2Nombre }}
        </div>
      </div>
      
      <div class="text-right">
        <div v-if="match.resultado_aprobado && match.ganador_id" class="text-lg font-bold">
          <div class="flex items-center space-x-2">
            <span>{{ match.resultado_sets_j1 || 0 }}</span>
            <span class="text-gray-400">-</span>
            <span>{{ match.resultado_sets_j2 || 0 }}</span>
          </div>
        </div>
        <div v-else class="text-sm text-gray-500 dark:text-gray-400">
          Sin resultado
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center">
      <div class="text-sm text-gray-500 dark:text-gray-400">
        <div v-if="match.fecha_agendada">
          {{ formatDate(match.fecha_agendada) }}
          <span v-if="match.hora_agendada" class="ml-1">{{ match.hora_agendada }}</span>
        </div>
        <div v-else>Sin fecha programada</div>
      </div>
      
      <span 
        class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
        :class="getStatusClass(match.estado)"
      >
        {{ match.estado }}
      </span>
    </div>

    <!-- Action buttons for players -->
    <div v-if="showPlayerActions" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div class="flex space-x-2">
        <button
          v-if="canProposeTime"
          @click="$emit('propose-time', match)"
          class="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300"
        >
          Proponer Horario
        </button>
        <button
          v-if="canReportResult"
          @click="$emit('report-result', match)"
          class="text-sm bg-secondary-100 text-secondary-700 px-3 py-1 rounded hover:bg-secondary-200 dark:bg-secondary-900 dark:text-secondary-300"
        >
          Reportar Resultado
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import type { Partido } from '../types'

interface Props {
  match: Partido
}

const props = defineProps<Props>()
const authStore = useAuthStore()

defineEmits<{
  'propose-time': [match: Partido]
  'report-result': [match: Partido]
}>()

const showPlayerActions = computed(() => authStore.isPlayer)

const canProposeTime = computed(() => {
  return props.match.estado === 'pendiente' || !props.match.fecha_agendada
})

const canReportResult = computed(() => {
  return props.match.estado === 'programado' && props.match.fecha_agendada
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-CL', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'programado':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'en_curso':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'finalizado':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'pendiente':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}
</script>