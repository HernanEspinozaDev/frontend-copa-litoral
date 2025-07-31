<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Partidos</h1>
        <p class="text-gray-600 dark:text-gray-400">Administra los partidos del torneo y aprueba resultados</p>
      </div>
      <button @click="showCreateModal = true" class="btn-primary">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Nuevo Partido
      </button>
    </div>

    <!-- Filters -->
    <div class="card mb-6">
      <div class="flex flex-wrap gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Filtrar por categoría
          </label>
          <select
            v-model="selectedCategory"
            class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Todas las categorías</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.nombre }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Estado del partido
          </label>
          <select
            v-model="selectedStatus"
            class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="programado">Programado</option>
            <option value="en_curso">En curso</option>
            <option value="finalizado">Finalizado</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Matches Table -->
    <div class="card">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Partido
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Categoría
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Fase
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Fecha/Hora
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Resultado
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
            <tr v-for="match in filteredMatches" :key="match.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ match.Jugador1Nombre }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  vs {{ match.Jugador2Nombre }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ match.CategoriaNombre }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ match.fase }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDateTime(match.fecha_agendada, match.hora_agendada) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div v-if="match.resultado_aprobado && match.ganador_id" class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ match.resultado_sets_j1 }} - {{ match.resultado_sets_j2 }}
                </div>
                <div v-else-if="match.resultado_sets_j1 !== null && match.resultado_sets_j2 !== null" class="text-sm text-yellow-600 dark:text-yellow-400">
                  {{ match.resultado_sets_j1 }} - {{ match.resultado_sets_j2 }} (Pendiente aprobación)
                </div>
                <div v-else class="text-sm text-gray-500 dark:text-gray-400">
                  Sin resultado
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getStatusClass(match.estado)"
                >
                  {{ match.estado }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="editMatch(match)"
                    class="text-primary-600 hover:text-primary-900 dark:text-primary-400"
                  >
                    Editar
                  </button>
                  <button
                    v-if="canApproveResult(match)"
                    @click="approveResult(match)"
                    class="text-green-600 hover:text-green-900 dark:text-green-400"
                  >
                    Aprobar
                  </button>
                  <button
                    @click="deleteMatch(match)"
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

      <div v-if="filteredMatches.length === 0" class="text-center py-8">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No hay partidos</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Comienza agregando un nuevo partido al torneo.
        </p>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <MatchModal
      v-if="showCreateModal || showEditModal"
      :match="selectedMatch"
      :categories="categories"
      :players="players"
      @close="closeModal"
      @submit="handleSubmit"
    />

    <!-- Delete Confirmation Modal -->
    <ConfirmationModal
      v-if="showDeleteModal"
      title="Eliminar Partido"
      :message="`¿Estás seguro de que quieres eliminar este partido?`"
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
import { partidosApi } from '../../api/partidos'
import { useToast } from 'vue-toastification'
import MatchModal from '../../components/MatchModal.vue'
import ConfirmationModal from '../../components/ConfirmationModal.vue'
import type { Partido, CreatePartidoPayload, UpdatePartidoPayload } from '../../types'

const tournamentStore = useTournamentStore()
const toast = useToast()

const selectedCategory = ref<number | string>('')
const selectedStatus = ref('')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedMatch = ref<Partido | null>(null)

const categories = computed(() => tournamentStore.categories)
const players = computed(() => tournamentStore.players)
const matches = computed(() => tournamentStore.matches)

const filteredMatches = computed(() => {
  let filtered = matches.value

  if (selectedCategory.value) {
    filtered = filtered.filter(match => match.categoria_id === Number(selectedCategory.value))
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(match => match.estado === selectedStatus.value)
  }

  return filtered
})

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

const formatDateTime = (fecha?: string, hora?: string) => {
  if (!fecha) return 'Sin programar'
  const date = new Date(fecha).toLocaleDateString('es-CL')
  return hora ? `${date} ${hora}` : date
}

const canApproveResult = (match: Partido) => {
  return match.resultado_sets_j1 !== null && 
         match.resultado_sets_j2 !== null && 
         !match.resultado_aprobado
}

const editMatch = (match: Partido) => {
  selectedMatch.value = match
  showEditModal.value = true
}

const deleteMatch = (match: Partido) => {
  selectedMatch.value = match
  showDeleteModal.value = true
}

const approveResult = async (match: Partido) => {
  try {
    await partidosApi.approveResult(match.id)
    await tournamentStore.fetchMatches()
    toast.success('Resultado aprobado correctamente')
  } catch (error: any) {
    toast.error(error.response?.data?.error || 'Error al aprobar resultado')
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  selectedMatch.value = null
}

const handleSubmit = async (payload: CreatePartidoPayload | UpdatePartidoPayload) => {
  try {
    if (showEditModal.value && selectedMatch.value) {
      await partidosApi.updatePartido(selectedMatch.value.id, payload as UpdatePartidoPayload)
      toast.success('Partido actualizado correctamente')
    } else {
      await partidosApi.createPartido(payload as CreatePartidoPayload)
      toast.success('Partido creado correctamente')
    }
    
    await tournamentStore.fetchMatches()
    closeModal()
  } catch (error: any) {
    toast.error(error.response?.data?.error || 'Error al guardar partido')
  }
}

const confirmDelete = async () => {
  if (!selectedMatch.value) return

  try {
    await partidosApi.deletePartido(selectedMatch.value.id)
    await tournamentStore.fetchMatches()
    toast.success('Partido eliminado correctamente')
    showDeleteModal.value = false
    selectedMatch.value = null
  } catch (error: any) {
    toast.error(error.response?.data?.error || 'Error al eliminar partido')
  }
}

onMounted(async () => {
  await tournamentStore.loadInitialData()
})
</script>