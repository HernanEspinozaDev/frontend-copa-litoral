<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Torneos</h1>
        <p class="text-gray-600 dark:text-gray-400">Administra los torneos</p>
      </div>
      <button @click="showCreateModal = true" class="btn-primary">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Nuevo Torneo
      </button>
    </div>

    <!-- Current Tournament -->
    <div v-if="currentTournament" class="card mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Torneo Actual</h2>
          <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300">{{ currentTournament.nombre }}</h3>
          <p class="text-gray-600 dark:text-gray-400">
            {{ formatDateRange(currentTournament.fecha_inicio, currentTournament.fecha_fin) }}
          </p>
        </div>
        <div class="flex space-x-2">
          <button
            @click="editTournament(currentTournament)"
            class="btn-secondary"
          >
            Editar
          </button>
          <span class="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Activo
          </span>
        </div>
      </div>
    </div>

    <!-- Tournament History -->
    <div class="card">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Historial de Torneos</h2>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Nombre
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Año
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Fechas
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Estado
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="tournament in allTournaments" :key="tournament.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ tournament.nombre }}
                </div>
                <div v-if="tournament.frase_destacada" class="text-sm text-gray-500 dark:text-gray-400">
                  {{ tournament.frase_destacada }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ tournament.anio }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDateRange(tournament.fecha_inicio, tournament.fecha_fin) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="tournament.activo 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'"
                >
                  {{ tournament.activo ? 'Activo' : 'Finalizado' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="editTournament(tournament)"
                    class="text-primary-600 hover:text-primary-900 dark:text-primary-400"
                  >
                    Editar
                  </button>
                  <button
                    v-if="!tournament.activo"
                    @click="deleteTournament(tournament)"
                    class="text-red-600 hover:text-red-900 dark:text-red-400"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="allTournaments.length === 0" class="text-center py-8">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7l2 2-2 2m2-2H9m10 0V9a2 2 0 00-2-2M5 21l2-2-2-2m2 2H3m2 0v-4a2 2 0 012-2"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No hay torneos</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Comienza creando un nuevo torneo.
        </p>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <TournamentModal
      v-if="showCreateModal || showEditModal"
      :tournament="selectedTournament"
      @close="closeModal"
      @submit="handleSubmit"
    />

    <!-- Delete Confirmation Modal -->
    <ConfirmationModal
      v-if="showDeleteModal"
      title="Eliminar Torneo"
      :message="`¿Estás seguro de que quieres eliminar el torneo ${selectedTournament?.nombre}?`"
      confirmText="Eliminar"
      cancelText="Cancelar"
      @confirm="confirmDelete"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTournamentStore } from '../../stores/tournament'
import { torneosApi } from '../../api/torneos'
import { useToast } from 'vue-toastification'
import TournamentModal from '../../components/TournamentModal.vue'
import ConfirmationModal from '../../components/ConfirmationModal.vue'
import type { Torneo, CreateTorneoPayload, UpdateTorneoPayload } from '../../types'

const tournamentStore = useTournamentStore()
const toast = useToast()

const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedTournament = ref<Torneo | null>(null)
const allTournaments = ref<Torneo[]>([])

const currentTournament = computed(() => tournamentStore.currentTournament)

const formatDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate).toLocaleDateString('es-CL')
  const end = new Date(endDate).toLocaleDateString('es-CL')
  return `${start} - ${end}`
}

const editTournament = (tournament: Torneo) => {
  selectedTournament.value = tournament
  showEditModal.value = true
}

const deleteTournament = (tournament: Torneo) => {
  selectedTournament.value = tournament
  showDeleteModal.value = true
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  selectedTournament.value = null
}

const handleSubmit = async (payload: CreateTorneoPayload | UpdateTorneoPayload) => {
  try {
    if (showEditModal.value && selectedTournament.value) {
      await torneosApi.updateTorneo(selectedTournament.value.id, payload as UpdateTorneoPayload)
      toast.success('Torneo actualizado correctamente')
    } else {
      await torneosApi.createTorneo(payload as CreateTorneoPayload)
      toast.success('Torneo creado correctamente')
    }
    
    await loadTournaments()
    await tournamentStore.fetchCurrentTournament()
    closeModal()
  } catch (error: any) {
    toast.error(error.response?.data?.error || 'Error al guardar torneo')
  }
}

const confirmDelete = async () => {
  if (!selectedTournament.value) return

  try {
    await torneosApi.deleteTorneo(selectedTournament.value.id)
    await loadTournaments()
    toast.success('Torneo eliminado correctamente')
    showDeleteModal.value = false
    selectedTournament.value = null
  } catch (error: any) {
    toast.error(error.response?.data?.error || 'Error al eliminar torneo')
  }
}

const loadTournaments = async () => {
  try {
    allTournaments.value = await torneosApi.getTorneos()
  } catch (error: any) {
    toast.error('Error al cargar torneos')
  }
}

onMounted(async () => {
  await tournamentStore.fetchCurrentTournament()
  await loadTournaments()
})
</script>