<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Categorías</h1>
        <p class="text-gray-600 dark:text-gray-400">Administra las categorías del torneo</p>
      </div>
      <button @click="showCreateModal = true" class="btn-primary">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Nueva Categoría
      </button>
    </div>

    <!-- Categories Table -->
    <div class="card">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Nombre
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Jugadores
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Partidos
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Fecha de creación
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="category in categories" :key="category.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ category.nombre }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ getPlayerCount(category.id) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ getMatchCount(category.id) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(category.created_at) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="editCategory(category)"
                    class="text-primary-600 hover:text-primary-900 dark:text-primary-400"
                  >
                    Editar
                  </button>
                  <button
                    @click="deleteCategory(category)"
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

      <div v-if="categories.length === 0" class="text-center py-8">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No hay categorías</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Comienza agregando una nueva categoría al torneo.
        </p>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <CategoryModal
      v-if="showCreateModal || showEditModal"
      :category="selectedCategory"
      @close="closeModal"
      @submit="handleSubmit"
    />

    <!-- Delete Confirmation Modal -->
    <ConfirmationModal
      v-if="showDeleteModal"
      title="Eliminar Categoría"
      :message="`¿Estás seguro de que quieres eliminar la categoría ${selectedCategory?.nombre}?`"
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
import { categoriasApi } from '../../api/categorias'
import { useToast } from 'vue-toastification'
import CategoryModal from '../../components/CategoryModal.vue'
import ConfirmationModal from '../../components/ConfirmationModal.vue'
import type { Categoria, CreateCategoriaPayload, UpdateCategoriaPayload } from '../../types'

const tournamentStore = useTournamentStore()
const toast = useToast()

const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedCategory = ref<Categoria | null>(null)

const categories = computed(() => tournamentStore.categories)
const players = computed(() => tournamentStore.players)
const matches = computed(() => tournamentStore.matches)

const getPlayerCount = (categoryId: number) => {
  return players.value.filter(player => player.categoria_id === categoryId).length
}

const getMatchCount = (categoryId: number) => {
  return matches.value.filter(match => match.categoria_id === categoryId).length
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-CL')
}

const editCategory = (category: Categoria) => {
  selectedCategory.value = category
  showEditModal.value = true
}

const deleteCategory = (category: Categoria) => {
  selectedCategory.value = category
  showDeleteModal.value = true
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  selectedCategory.value = null
}

const handleSubmit = async (payload: CreateCategoriaPayload | UpdateCategoriaPayload) => {
  try {
    if (showEditModal.value && selectedCategory.value) {
      await categoriasApi.updateCategoria(selectedCategory.value.id, payload as UpdateCategoriaPayload)
      toast.success('Categoría actualizada correctamente')
    } else {
      await categoriasApi.createCategoria(payload as CreateCategoriaPayload)
      toast.success('Categoría creada correctamente')
    }
    
    await tournamentStore.fetchCategories()
    closeModal()
  } catch (error: any) {
    toast.error(error.response?.data?.error || 'Error al guardar categoría')
  }
}

const confirmDelete = async () => {
  if (!selectedCategory.value) return

  try {
    await categoriasApi.deleteCategoria(selectedCategory.value.id)
    await tournamentStore.fetchCategories()
    toast.success('Categoría eliminada correctamente')
    showDeleteModal.value = false
    selectedCategory.value = null
  } catch (error: any) {
    toast.error(error.response?.data?.error || 'Error al eliminar categoría')
  }
}

onMounted(async () => {
  await tournamentStore.loadInitialData()
})
</script>