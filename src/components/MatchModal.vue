<template>
  <Modal @close="$emit('close')">
    <div class="p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        {{ match ? 'Editar Partido' : 'Nuevo Partido' }}
      </h3>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="categoria_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Categoría *
          </label>
          <select
            id="categoria_id"
            v-model="form.categoria_id"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Seleccionar categoría</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.nombre }}
            </option>
          </select>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="jugador1_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Jugador 1 *
            </label>
            <select
              id="jugador1_id"
              v-model="form.jugador1_id"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Seleccionar jugador</option>
              <option v-for="player in availablePlayers" :key="player.id" :value="player.id">
                {{ player.nombre }} {{ player.apellido }}
              </option>
            </select>
          </div>

          <div>
            <label for="jugador2_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Jugador 2 *
            </label>
            <select
              id="jugador2_id"
              v-model="form.jugador2_id"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Seleccionar jugador</option>
              <option v-for="player in availablePlayers" :key="player.id" :value="player.id">
                {{ player.nombre }} {{ player.apellido }}
              </option>
            </select>
          </div>
        </div>

        <div>
          <label for="fase" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Fase *
          </label>
          <select
            id="fase"
            v-model="form.fase"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Seleccionar fase</option>
            <option value="Primera Ronda">Primera Ronda</option>
            <option value="Segunda Ronda">Segunda Ronda</option>
            <option value="Octavos de Final">Octavos de Final</option>
            <option value="Cuartos de Final">Cuartos de Final</option>
            <option value="Semifinal">Semifinal</option>
            <option value="Final">Final</option>
          </select>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="fecha_agendada" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fecha programada
            </label>
            <input
              id="fecha_agendada"
              v-model="form.fecha_agendada"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label for="hora_agendada" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Hora programada
            </label>
            <input
              id="hora_agendada"
              v-model="form.hora_agendada"
              type="time"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label for="estado" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Estado
          </label>
          <select
            id="estado"
            v-model="form.estado"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="pendiente">Pendiente</option>
            <option value="programado">Programado</option>
            <option value="en_curso">En curso</option>
            <option value="finalizado">Finalizado</option>
          </select>
        </div>

        <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="submitting"
            class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ submitting ? 'Guardando...' : (match ? 'Actualizar' : 'Crear') }}
          </button>
        </div>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { reactive, ref, watch, computed } from 'vue'
import Modal from './Modal.vue'
import type { Partido, Categoria, Jugador, CreatePartidoPayload, UpdatePartidoPayload } from '../types'

interface Props {
  match?: Partido | null
  categories: Categoria[]
  players: Jugador[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  submit: [payload: CreatePartidoPayload | UpdatePartidoPayload]
}>()

const submitting = ref(false)

const form = reactive({
  torneo_id: 1, // Assuming current tournament ID is 1
  categoria_id: null as number | null,
  jugador1_id: null as number | null,
  jugador2_id: null as number | null,
  fase: '',
  fecha_agendada: '',
  hora_agendada: '',
  estado: 'pendiente'
})

const availablePlayers = computed(() => {
  if (!form.categoria_id) return props.players
  return props.players.filter(player => player.categoria_id === form.categoria_id)
})

// Watch for match prop changes to populate form
watch(() => props.match, (match) => {
  if (match) {
    form.torneo_id = match.torneo_id
    form.categoria_id = match.categoria_id
    form.jugador1_id = match.jugador1_id
    form.jugador2_id = match.jugador2_id
    form.fase = match.fase
    form.fecha_agendada = match.fecha_agendada || ''
    form.hora_agendada = match.hora_agendada || ''
    form.estado = match.estado
  } else {
    // Reset form for new match
    form.torneo_id = 1
    form.categoria_id = null
    form.jugador1_id = null
    form.jugador2_id = null
    form.fase = ''
    form.fecha_agendada = ''
    form.hora_agendada = ''
    form.estado = 'pendiente'
  }
}, { immediate: true })

const handleSubmit = async () => {
  submitting.value = true
  
  try {
    const payload = {
      torneo_id: form.torneo_id,
      categoria_id: form.categoria_id!,
      jugador1_id: form.jugador1_id!,
      jugador2_id: form.jugador2_id!,
      fase: form.fase,
      fecha_agendada: form.fecha_agendada || undefined,
      hora_agendada: form.hora_agendada || undefined,
      estado: form.estado
    }
    
    emit('submit', payload)
  } finally {
    submitting.value = false
  }
}
</script>