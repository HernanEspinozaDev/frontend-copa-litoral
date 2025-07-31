<template>
  <Modal @close="$emit('close')">
    <div class="p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        {{ tournament ? 'Editar Torneo' : 'Nuevo Torneo' }}
      </h3>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="nombre" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nombre *
          </label>
          <input
            id="nombre"
            v-model="form.nombre"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            placeholder="Nombre del torneo"
          />
        </div>

        <div>
          <label for="anio" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Año *
          </label>
          <input
            id="anio"
            v-model.number="form.anio"
            type="number"
            required
            :min="2020"
            :max="2030"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="fecha_inicio" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fecha de inicio *
            </label>
            <input
              id="fecha_inicio"
              v-model="form.fecha_inicio"
              type="date"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label for="fecha_fin" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fecha de fin *
            </label>
            <input
              id="fecha_fin"
              v-model="form.fecha_fin"
              type="date"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label for="foto_url" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            URL de la foto
          </label>
          <input
            id="foto_url"
            v-model="form.foto_url"
            type="url"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            placeholder="https://ejemplo.com/foto.jpg"
          />
        </div>

        <div>
          <label for="frase_destacada" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Frase destacada
          </label>
          <textarea
            id="frase_destacada"
            v-model="form.frase_destacada"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            placeholder="Frase que describe el torneo"
          ></textarea>
        </div>

        <div>
          <label class="flex items-center">
            <input
              v-model="form.activo"
              type="checkbox"
              class="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            />
            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Torneo activo
            </span>
          </label>
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
            {{ submitting ? 'Guardando...' : (tournament ? 'Actualizar' : 'Crear') }}
          </button>
        </div>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import Modal from './Modal.vue'
import type { Torneo, CreateTorneoPayload, UpdateTorneoPayload } from '../types'

interface Props {
  tournament?: Torneo | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  submit: [payload: CreateTorneoPayload | UpdateTorneoPayload]
}>()

const submitting = ref(false)

const form = reactive({
  nombre: '',
  anio: new Date().getFullYear(),
  fecha_inicio: '',
  fecha_fin: '',
  foto_url: '',
  frase_destacada: '',
  activo: false
})

// Watch for tournament prop changes to populate form
watch(() => props.tournament, (tournament) => {
  if (tournament) {
    form.nombre = tournament.nombre
    form.anio = tournament.anio
    form.fecha_inicio = tournament.fecha_inicio.split('T')[0] // Extract date part
    form.fecha_fin = tournament.fecha_fin.split('T')[0] // Extract date part
    form.foto_url = tournament.foto_url || ''
    form.frase_destacada = tournament.frase_destacada || ''
    form.activo = tournament.activo
  } else {
    // Reset form for new tournament
    form.nombre = ''
    form.anio = new Date().getFullYear()
    form.fecha_inicio = ''
    form.fecha_fin = ''
    form.foto_url = ''
    form.frase_destacada = ''
    form.activo = false
  }
}, { immediate: true })

const handleSubmit = async () => {
  submitting.value = true
  
  try {
    const payload = {
      nombre: form.nombre,
      anio: form.anio,
      fecha_inicio: form.fecha_inicio,
      fecha_fin: form.fecha_fin,
      foto_url: form.foto_url || undefined,
      frase_destacada: form.frase_destacada || undefined,
      activo: form.activo
    }
    
    emit('submit', payload)
  } finally {
    submitting.value = false
  }
}
</script>