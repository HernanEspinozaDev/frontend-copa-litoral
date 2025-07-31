<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Jugadores</h1>
        <p class="text-gray-600 dark:text-gray-400">Administra los jugadores del torneo</p>
      </div>
      <button @click="showCreateModal = true" class="btn-primary">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Nuevo Jugador
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
            Estado de participación
          </label>
          <select
            v-model="selectedStatus"
            class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Todos los estados</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="eliminado">Eliminado</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Players Table -->
    <div class="card">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Jugador
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Categoría
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Club
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Contacto
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
            <tr v-for="player in filteredPlayers" :key="player.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ player.nombre }} {{ player.apellido }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ player.CategoriaNombre || 'Sin categoría' }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ player.club || 'Sin club' }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ player.contacto_visible_en_web ? player.telefono_wsp || 'Sin teléfono' : 'Privado' }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getStatusClass(player.estado_participacion)"
                >
                  {{ player.estado_participacion }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="editPlayer(player)"
                    class="text-primary-600 hover:text-primary-900 dark:text-primary-400"
                  >
                    Editar
                  </button>
                  <button
                    @click="deletePlayer(player)"
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

      <div v-if="filteredPlayers.length === 0" class="text-center py-8">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No hay jugadores</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Comienza agregando un nuevo jugador al torneo.
        </p>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <PlayerModal
      v-if="showCreateModal || showEditModal"
      :player="selectedPlayer"
      :categories="categories"
      @close="closeModal"
      @submit="handleSubmit"
    />

    <!-- Delete Confirmation Modal -->
    <ConfirmationModal
      v-if="showDeleteModal"
      title="Eliminar Jugador"
      :message="`¿Estás seguro de que quieres eliminar a ${selectedPlayer?.nombre} ${selectedPlayer?.apellido}?`"
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
import { jugadoresApi } from '../../api/jugadores'
import { useToast } from 'vue-toastification'
import PlayerModal from '../../components/PlayerModal.vue'
import ConfirmationModal from '../../components/ConfirmationModal.vue'
import type { Jugador, CreateJugadorPayload, UpdateJugadorPayload } from '../../types'

const tournamentStore = useTournamentStore()
const toast = useToast()

const selectedCategory = ref<number | string>('')
const selectedStatus = ref('')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedPlayer = ref<Jugador | null>(null)

const categories = computed(() => tournamentStore.categories)
const players = computed(() => tournamentStore.players)

const filteredPlayers = computed(() => {
  let filtered = players.value

  if (selectedCategory.value) {
    filtered = filtered.filter(player => player.categoria_id === Number(selectedCategory.value))
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(player => player.estado_participacion === selectedStatus.value)
  }

  return filtered
})

const getStatusClass = (status: string) => {
  switch (status) {
    case 'activo':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'inactivo':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'eliminado':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

const editPlayer = (player: Jugador) => {
  selectedPlayer.value = player
  showEditModal.value = true
}

const deletePlayer = (player: Jugador) => {
  selectedPlayer.value = player
  showDeleteModal.value = true
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  selectedPlayer.value = null
}

const handleSubmit = async (payload: CreateJugadorPayload | UpdateJugadorPayload) => {
  try {
    if (showEditModal.value && selectedPlayer.value) {
      await jugadoresApi.updateJugador(selectedPlayer.value.id, payload as UpdateJugadorPayload)
      toast.success('Jugador actualizado correctamente')
    } else {
      await jugadoresApi.createJugador(payload as CreateJugadorPayload)
      toast.success('Jugador creado correctamente')
    }
    
    await tournamentStore.fetchPlayers()
    closeModal()
  } catch (error: any) {
    toast.error(error.response?.data?.error || 'Error al guardar jugador')
  }
}

const confirmDelete = async () => {
  if (!selectedPlayer.value) return

  try {
    await jugadoresApi.deleteJugador(selectedPlayer.value.id)
    await tournamentStore.fetchPlayers()
    toast.success('Jugador eliminado correctamente')
    showDeleteModal.value = false
    selectedPlayer.value = null
  } catch (error: any) {
    toast.error(error.response?.data?.error || 'Error al eliminar jugador')
  }
}

onMounted(async () => {
  await tournamentStore.loadInitialData()
})
</script>