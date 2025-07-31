<template>
  <Modal @close="$emit('close')">
    <div class="p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        {{ player ? 'Editar Jugador' : 'Nuevo Jugador' }}
      </h3>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              placeholder="Nombre del jugador"
            />
          </div>

          <div>
            <label for="apellido" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Apellido *
            </label>
            <input
              id="apellido"
              v-model="form.apellido"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="Apellido del jugador"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="telefono_wsp" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Teléfono WhatsApp
            </label>
            <input
              id="telefono_wsp"
              v-model="form.telefono_wsp"
              type="tel"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="+56 9 1234 5678"
            />
          </div>

          <div>
            <label for="club" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Club
            </label>
            <input
              id="club"
              v-model="form.club"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="Nombre del club"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="categoria_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Categoría
            </label>
            <select
              id="categoria_id"
              v-model="form.categoria_id"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Seleccionar categoría</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.nombre }}
              </option>
            </select>
          </div>

          <div>
            <label for="estado_participacion" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Estado de participación *
            </label>
            <select
              id="estado_participacion"
              v-model="form.estado_participacion"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Seleccionar estado</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
              <option value="eliminado">Eliminado</option>
            </select>
          </div>
        </div>

        <div>
          <label class="flex items-center">
            <input
              v-model="form.contacto_visible_en_web"
              type="checkbox"
              class="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            />
            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Mostrar contacto en la web
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
            {{ submitting ? 'Guardando...' : (player ? 'Actualizar' : 'Crear') }}
          </button>
        </div>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import Modal from './Modal.vue'
import type { Jugador, Categoria, CreateJugadorPayload, UpdateJugadorPayload } from '../types'

interface Props {
  player?: Jugador | null
  categories: Categoria[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  submit: [payload: CreateJugadorPayload | UpdateJugadorPayload]
}>()

const submitting = ref(false)

const form = reactive({
  nombre: '',
  apellido: '',
  telefono_wsp: '',
  club: '',
  categoria_id: null as number | null,
  estado_participacion: '',
  contacto_visible_en_web: false
})

// Watch for player prop changes to populate form
watch(() => props.player, (player) => {
  if (player) {
    form.nombre = player.nombre
    form.apellido = player.apellido
    form.telefono_wsp = player.telefono_wsp || ''
    form.club = player.club || ''
    form.categoria_id = player.categoria_id || null
    form.estado_participacion = player.estado_participacion
    form.contacto_visible_en_web = player.contacto_visible_en_web
  } else {
    // Reset form for new player
    form.nombre = ''
    form.apellido = ''
    form.telefono_wsp = ''
    form.club = ''
    form.categoria_id = null
    form.estado_participacion = 'activo'
    form.contacto_visible_en_web = false
  }
}, { immediate: true })

const handleSubmit = async () => {
  submitting.value = true
  
  try {
    const payload = {
      nombre: form.nombre,
      apellido: form.apellido,
      telefono_wsp: form.telefono_wsp || undefined,
      club: form.club || undefined,
      categoria_id: form.categoria_id || undefined,
      estado_participacion: form.estado_participacion,
      contacto_visible_en_web: form.contacto_visible_en_web
    }
    
    emit('submit', payload)
  } finally {
    submitting.value = false
  }
}
</script>