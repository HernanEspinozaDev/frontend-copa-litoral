<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Historial y Palmarés</h1>
        <p class="text-gray-600 dark:text-gray-400">Revive los momentos más destacados de la Copa Litoral</p>
      </div>

      <!-- Tournament History -->
      <section class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Ediciones Anteriores</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="tournament in previousTournaments" 
            :key="tournament.id"
            class="card hover:shadow-lg transition-shadow cursor-pointer"
            @click="selectTournament(tournament)"
          >
            <div class="aspect-video bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg mb-4 flex items-center justify-center">
              <h3 class="text-2xl font-bold text-white">{{ tournament.anio }}</h3>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ tournament.nombre }}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">
              {{ formatDateRange(tournament.fecha_inicio, tournament.fecha_fin) }}
            </p>
            <p class="text-gray-500 dark:text-gray-500 text-sm">
              {{ tournament.frase_destacada || 'Una edición memorable' }}
            </p>
          </div>
        </div>
      </section>

      <!-- Champions Gallery -->
      <section class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Galería de Campeones</h2>
        
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Año
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Campeón
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Finalista
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="champion in champions" :key="`${champion.year}-${champion.category}`">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {{ champion.year }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {{ champion.category }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mr-3">
                        <svg class="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </div>
                      <span class="text-sm font-medium text-gray-900 dark:text-white">{{ champion.winner }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {{ champion.finalist }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Statistics -->
      <section>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Estadísticas Históricas</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="card text-center">
            <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7l2 2-2 2m2-2H9m10 0V9a2 2 0 00-2-2M5 21l2-2-2-2m2 2H3m2 0v-4a2 2 0 012-2"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ statistics.totalTournaments }}</h3>
            <p class="text-gray-600 dark:text-gray-400">Torneos Realizados</p>
          </div>

          <div class="card text-center">
            <div class="w-16 h-16 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-secondary-600 dark:text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ statistics.totalPlayers }}</h3>
            <p class="text-gray-600 dark:text-gray-400">Jugadores Participantes</p>
          </div>

          <div class="card text-center">
            <div class="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ statistics.totalMatches }}</h3>
            <p class="text-gray-600 dark:text-gray-400">Partidos Jugados</p>
          </div>

          <div class="card text-center">
            <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ statistics.totalCategories }}</h3>
            <p class="text-gray-600 dark:text-gray-400">Categorías Disputadas</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Torneo } from '../types';

// Mock data - En una implementación real, estos datos vendrían de la API
const previousTournaments = ref<Torneo[]>([
  {
    id: 1,
    nombre: 'Copa Litoral 2024',
    anio: 2024,
    fecha_inicio: '2024-07-15',
    fecha_fin: '2024-08-15',
    foto_url: '',
    frase_destacada: 'Un año de grandes emociones y partidos memorables',
    activo: false,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 2,
    nombre: 'Copa Litoral 2023',
    anio: 2023,
    fecha_inicio: '2023-07-15',
    fecha_fin: '2023-08-15',
    foto_url: '',
    frase_destacada: 'La competencia más reñida de la historia',
    activo: false,
    created_at: '2023-01-01',
    updated_at: '2023-01-01'
  },
  {
    id: 3,
    nombre: 'Copa Litoral 2022',
    anio: 2022,
    fecha_inicio: '2022-07-15',
    fecha_fin: '2022-08-15',
    foto_url: '',
    frase_destacada: 'El regreso después de la pandemia',
    activo: false,
    created_at: '2022-01-01',
    updated_at: '2022-01-01'
  }
]);

const champions = ref([
  { year: 2024, category: 'Primera A', winner: 'Juan Pérez', finalist: 'Carlos González' },
  { year: 2024, category: 'Primera B', winner: 'María López', finalist: 'Ana Martínez' },
  { year: 2024, category: 'Segunda', winner: 'Pedro Rodríguez', finalist: 'Luis Silva' },
  { year: 2023, category: 'Primera A', winner: 'Carlos González', finalist: 'Miguel Torres' },
  { year: 2023, category: 'Primera B', winner: 'Ana Martínez', finalist: 'Laura Díaz' },
  { year: 2023, category: 'Segunda', winner: 'Roberto Vargas', finalist: 'Diego Moreno' },
  { year: 2022, category: 'Primera A', winner: 'Miguel Torres', finalist: 'Juan Pérez' },
  { year: 2022, category: 'Primera B', winner: 'Laura Díaz', finalist: 'Carmen Ruiz' },
  { year: 2022, category: 'Segunda', winner: 'Diego Moreno', finalist: 'Andrés Castro' }
]);

const statistics = computed(() => ({
  totalTournaments: previousTournaments.value.length + 1, // +1 for current tournament
  totalPlayers: 156, // Mock data - would come from API
  totalMatches: 432, // Mock data - would come from API
  totalCategories: 8 // Mock data - would come from API
}));

const formatDateRange = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const startMonth = start.toLocaleDateString('es-CL', { month: 'long' });
  const endMonth = end.toLocaleDateString('es-CL', { month: 'long' });
  
  if (startMonth === endMonth) {
    return `${start.getDate()} - ${end.getDate()} de ${endMonth} ${end.getFullYear()}`;
  } else {
    return `${start.getDate()} de ${startMonth} - ${end.getDate()} de ${endMonth} ${end.getFullYear()}`;
  }
};

const selectTournament = (tournament: Torneo) => {
  // En una implementación real, esto podría abrir un modal con detalles del torneo
  // o navegar a una página específica del torneo
  console.log('Selected tournament:', tournament);
};
</script>