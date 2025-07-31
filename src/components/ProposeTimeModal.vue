<template>
  <Modal @close="$emit('close')">
    <div class="p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Proponer Horario de Partido
      </h3>
      
      <div class="mb-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div class="text-sm text-gray-600 dark:text-gray-400">Partido:</div>
        <div class="font-medium text-gray-900 dark:text-white">
          {{ match?.Jugador1Nombre }} vs {{ match?.Jugador2Nombre }}
        </div>
        <div class="text-sm text-gray-500 dark:text-gray-500">
          {{ match?.CategoriaNombre }} - {{ match?.fase }}
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="fecha" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Fecha *
          </label>
          <input
            id="fecha"
            v-model="form.fecha_agendada"
            type="date"
            required
            :min="minDate"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label for="hora" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Hora *
          </label>
          <input
            id="hora"
            v-model="form.hora_agendada"
            type="time"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div class="bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 rounded-md p-4">
          <div class="flex">
            <svg class="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div class="ml-3">
              <p class="text-sm text-blue-800 dark:text-blue-200">
                Tu propuesta será enviada al otro jugador para su aprobación.
              </p>
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-3 pt-4">
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
            {{ submitting ? 'Enviando...' : 'Proponer Horario' }}
          </button>
        </div>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import Modal from './Modal.vue'
import type { Partido, ProposeTimePayload } from '../types'

interface Props {
  match?: Partido | null
}

defineProps<Props>()
const emit = defineEmits<{
  close: []
  submit: [payload: ProposeTimePayload]
}>()

const submitting = ref(false)

const form = reactive({
  fecha_agendada: '',
  hora_agendada: ''
})

const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const handleSubmit = async () => {
  submitting.value = true
  
  try {
    emit('submit', {
      fecha_agendada: form.fecha_agendada,
      hora_agendada: form.hora_agendada
    })
  } finally {
    submitting.value = false
  }
}
</script>