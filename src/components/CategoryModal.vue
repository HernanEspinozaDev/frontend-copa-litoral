<template>
  <Modal @close="$emit('close')">
    <div class="p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        {{ category ? 'Editar Categoría' : 'Nueva Categoría' }}
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
            placeholder="Nombre de la categoría"
          />
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
            {{ submitting ? 'Guardando...' : (category ? 'Actualizar' : 'Crear') }}
          </button>
        </div>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import Modal from './Modal.vue'
import type { Categoria, CreateCategoriaPayload, UpdateCategoriaPayload } from '../types'

interface Props {
  category?: Categoria | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  submit: [payload: CreateCategoriaPayload | UpdateCategoriaPayload]
}>()

const submitting = ref(false)

const form = reactive({
  nombre: ''
})

// Watch for category prop changes to populate form
watch(() => props.category, (category) => {
  if (category) {
    form.nombre = category.nombre
  } else {
    // Reset form for new category
    form.nombre = ''
  }
}, { immediate: true })

const handleSubmit = async () => {
  submitting.value = true
  
  try {
    const payload = {
      nombre: form.nombre
    }
    
    emit('submit', payload)
  } finally {
    submitting.value = false
  }
}
</script>