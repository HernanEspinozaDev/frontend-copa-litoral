<template>
  <Modal @close="$emit('close')">
    <div class="p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Reportar Resultado
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

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Sets ganados -->
        <div>
          <h4 class="font-medium text-gray-900 dark:text-white mb-3">Sets Ganados</h4>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {{ match?.Jugador1Nombre }}
              </label>
              <input
                v-model.number="form.resultado_sets_j1"
                type="number"
                min="0"
                max="5"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white text-center text-lg font-semibold"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {{ match?.Jugador2Nombre }}
              </label>
              <input
                v-model.number="form.resultado_sets_j2"
                type="number"
                min="0"
                max="5"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white text-center text-lg font-semibold"
              />
            </div>
          </div>
        </div>

        <!-- Detalle de sets -->
        <div>
          <h4 class="font-medium text-gray-900 dark:text-white mb-3">Detalle de Sets</h4>
          <div class="space-y-3">
            <div v-for="setNum in totalSets" :key="setNum" class="grid grid-cols-3 gap-4 items-center">
              <div class="text-sm font-medium text-gray-700 dark:text-gray-300">
                Set {{ setNum }}
              </div>
              <input
                v-model.number="form.sets[setNum - 1].games_j1"
                type="number"
                min="0"
                max="20"
                required
                class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white text-center"
                :placeholder="`Games ${match?.Jugador1Nombre?.split(' ')[0]}`"
              />
              <input
                v-model.number="form.sets[setNum - 1].games_j2"
                type="number"
                min="0"
                max="20"
                required
                class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white text-center"
                :placeholder="`Games ${match?.Jugador2Nombre?.split(' ')[0]}`"
              />
            </div>
          </div>
        </div>

        <div class="bg-yellow-50 dark:bg-yellow-900/50 border border-yellow-200 dark:border-yellow-800 rounded-md p-4">
          <div class="flex">
            <svg class="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
            <div class="ml-3">
              <p class="text-sm text-yellow-800 dark:text-yellow-200">
                El resultado será enviado al administrador para su aprobación.
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
            :disabled="submitting || !isValidResult"
            class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ submitting ? 'Enviando...' : 'Reportar Resultado' }}
          </button>
        </div>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue'
import Modal from './Modal.vue'
import type { Partido, ReportResultPayload } from '../types'

interface Props {
  match?: Partido | null
}

defineProps<Props>()
const emit = defineEmits<{
  close: []
  submit: [payload: ReportResultPayload]
}>()

const submitting = ref(false)

const form = reactive({
  resultado_sets_j1: 0,
  resultado_sets_j2: 0,
  sets: [] as Array<{
    set_numero: number
    games_j1: number
    games_j2: number
  }>
})

const totalSets = computed(() => {
  return Math.max(form.resultado_sets_j1 + form.resultado_sets_j2, 1)
})

const isValidResult = computed(() => {
  return form.resultado_sets_j1 > 0 || form.resultado_sets_j2 > 0
})

// Watch for changes in total sets to adjust the sets array
watch(totalSets, (newTotal) => {
  // Adjust sets array length
  while (form.sets.length < newTotal) {
    form.sets.push({
      set_numero: form.sets.length + 1,
      games_j1: 0,
      games_j2: 0
    })
  }
  
  if (form.sets.length > newTotal) {
    form.sets.splice(newTotal)
  }
}, { immediate: true })

const handleSubmit = async () => {
  submitting.value = true
  
  try {
    emit('submit', {
      resultado_sets_j1: form.resultado_sets_j1,
      resultado_sets_j2: form.resultado_sets_j2,
      sets: form.sets.slice(0, totalSets.value)
    })
  } finally {
    submitting.value = false
  }
}
</script>