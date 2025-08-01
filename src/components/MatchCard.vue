<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 group hover:-translate-y-1">
    <!-- Header con estado -->
    <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-3">
          <span class="text-sm font-medium text-naranja-arcilla-600 bg-naranja-arcilla-100 dark:bg-naranja-arcilla-900 dark:text-naranja-arcilla-300 px-3 py-1 rounded-full">
            {{ match.CategoriaNombre }}
          </span>
          <span class="text-sm font-medium text-azul-marino-600 bg-azul-marino-100 dark:bg-azul-marino-900 dark:text-azul-marino-300 px-3 py-1 rounded-full">
            {{ match.fase }}
          </span>
        </div>
        <span 
          class="inline-flex px-3 py-1 text-xs font-semibold rounded-full"
          :class="getStatusClass(match.estado)"
        >
          {{ getStatusText(match.estado) }}
        </span>
      </div>
    </div>

    <!-- Contenido del partido -->
    <div class="p-6">
      <!-- Jugadores y resultado -->
      <div class="space-y-4 mb-6">
        <div class="flex justify-between items-center p-4 rounded-lg transition-colors" 
             :class="match.ganador_id === match.jugador1_id ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500' : 'bg-gray-50 dark:bg-gray-800'">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-azul-marino-500 to-azul-marino-700 rounded-full flex items-center justify-center">
              <span class="text-white font-bold text-sm">{{ getPlayerInitials(match.Jugador1Nombre) }}</span>
            </div>
            <div>
              <div class="font-semibold text-gray-900 dark:text-white">{{ match.Jugador1Nombre }}</div>
              <div v-if="showPlayerContact && getPlayerContact(match.jugador1_id)" class="text-xs text-gray-500 dark:text-gray-400">
                {{ getPlayerContact(match.jugador1_id) }}
              </div>
            </div>
          </div>
          <div class="text-right">
            <span class="text-2xl font-bold" :class="match.ganador_id === match.jugador1_id ? 'text-green-600' : 'text-gray-500 dark:text-gray-400'">
              {{ match.resultado_sets_j1 ?? '-' }}
            </span>
          </div>
        </div>

        <div class="flex justify-center">
          <div class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <span class="text-gray-500 dark:text-gray-400 font-bold text-sm">VS</span>
          </div>
        </div>

        <div class="flex justify-between items-center p-4 rounded-lg transition-colors" 
             :class="match.ganador_id === match.jugador2_id ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500' : 'bg-gray-50 dark:bg-gray-800'">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-naranja-arcilla-500 to-naranja-arcilla-700 rounded-full flex items-center justify-center">
              <span class="text-white font-bold text-sm">{{ getPlayerInitials(match.Jugador2Nombre) }}</span>
            </div>
            <div>
              <div class="font-semibold text-gray-900 dark:text-white">{{ match.Jugador2Nombre }}</div>
              <div v-if="showPlayerContact && getPlayerContact(match.jugador2_id)" class="text-xs text-gray-500 dark:text-gray-400">
                {{ getPlayerContact(match.jugador2_id) }}
              </div>
            </div>
          </div>
          <div class="text-right">
            <span class="text-2xl font-bold" :class="match.ganador_id === match.jugador2_id ? 'text-green-600' : 'text-gray-500 dark:text-gray-400'">
              {{ match.resultado_sets_j2 ?? '-' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Información del partido -->
      <div class="space-y-3 mb-6">
        <div class="flex items-center justify-between text-sm">
          <div class="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span>{{ formatDateTime(match.fecha_agendada, match.hora_agendada) }}</span>
          </div>
          <div v-if="match.resultado_aprobado && match.ganador_id" class="flex items-center space-x-1 text-green-600">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-xs font-medium">Resultado Oficial</span>
          </div>
        </div>
      </div>

      <!-- Acciones para jugadores -->
      <div v-if="showPlayerActions" class="border-t border-gray-200 dark:border-gray-700 pt-4">
        <div class="flex flex-wrap gap-2">
          <button
            v-if="canProposeTime"
            @click="$emit('propose-time', match)"
            class="flex-1 bg-azul-marino-100 text-azul-marino-700 hover:bg-azul-marino-200 dark:bg-azul-marino-900 dark:text-azul-marino-300 dark:hover:bg-azul-marino-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Proponer Horario</span>
          </button>
          
          <button
            v-if="canReportResult"
            @click="$emit('report-result', match)"
            class="flex-1 bg-naranja-arcilla-100 text-naranja-arcilla-700 hover:bg-naranja-arcilla-200 dark:bg-naranja-arcilla-900 dark:text-naranja-arcilla-300 dark:hover:bg-naranja-arcilla-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
            </svg>
            <span>Reportar Resultado</span>
          </button>

          <button
            v-if="canContactOpponent"
            @click="contactOpponent"
            class="bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useTournamentStore } from '../stores/tournament'
import type { Partido } from '../types'

interface Props {
  match: Partido
  showPlayerContact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showPlayerContact: false
})

const authStore = useAuthStore()
const tournamentStore = useTournamentStore()

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

const canContactOpponent = computed(() => {
  return authStore.isPlayer && (props.match.estado === 'pendiente' || props.match.estado === 'programado')
})

const getPlayerInitials = (name?: string) => {
  if (!name) return '??'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const getPlayerContact = (playerId: number) => {
  const player = tournamentStore.players.find(p => p.id === playerId)
  return player?.contacto_visible_en_web ? player.telefono_wsp : null
}

const formatDateTime = (fecha?: string, hora?: string) => {
  if (!fecha) return 'Sin programar'
  const date = new Date(fecha).toLocaleDateString('es-CL', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
  return hora ? `${date} - ${hora}` : date
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

const getStatusText = (status: string) => {
  switch (status) {
    case 'programado':
      return '🟠 Agendado'
    case 'en_curso':
      return '🟡 En Curso'
    case 'finalizado':
      return '🟢 Jugado'
    case 'pendiente':
      return '🟡 Pendiente'
    default:
      return status
  }
}

const contactOpponent = () => {
  // Lógica para contactar al oponente por WhatsApp
  const opponentId = authStore.user?.id === props.match.jugador1_id ? props.match.jugador2_id : props.match.jugador1_id
  const opponent = tournamentStore.players.find(p => p.id === opponentId)
  
  if (opponent?.telefono_wsp) {
    const message = `Hola ${opponent.nombre}, soy tu rival en la Copa Litoral (${props.match.CategoriaNombre} - ${props.match.fase}). ¿Podemos coordinar nuestro partido?`
    const whatsappUrl = `https://wa.me/${opponent.telefono_wsp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }
}
</script>