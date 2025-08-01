<template>
  <div>
    <!-- Hero Section con foto destacada -->
    <section 
      class="relative min-h-screen flex items-center justify-center copa-litoral-gradient text-white overflow-hidden"
      :style="currentTournament?.foto_url ? `background-image: linear-gradient(rgba(0, 0, 128, 0.7), rgba(210, 105, 30, 0.7)), url(${currentTournament.foto_url})` : ''"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-azul-marino-900/80 via-azul-marino-800/70 to-naranja-arcilla-600/80"></div>
      
      <!-- Decorative elements -->
      <div class="absolute top-20 left-10 w-32 h-32 border-2 border-white/20 rounded-full animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-24 h-24 border-2 border-naranja-arcilla-400/30 rounded-full animate-bounce"></div>
      
      <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <!-- Logo/Badge -->
        <div class="mb-8">
          <div class="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full border-2 border-white/20 mb-6">
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
            </svg>
          </div>
        </div>

        <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {{ currentTournament?.nombre || 'Copa Litoral 2025' }}
        </h1>
        
        <!-- Frase destacada -->
        <p class="text-xl md:text-3xl mb-8 opacity-95 font-light max-w-4xl mx-auto leading-relaxed">
          {{ currentTournament?.frase_destacada || 'El torneo de tenis más prestigioso de la región litoral' }}
        </p>

        <!-- Fechas clave -->
        <div class="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
          <div class="bg-white/15 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20 shadow-2xl">
            <div class="flex items-center space-x-3">
              <svg class="w-6 h-6 text-naranja-arcilla-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <div>
                <span class="text-sm opacity-80 block">Inicio del Torneo</span>
                <div class="font-bold text-lg">
                  {{ formatDate(currentTournament?.fecha_inicio) }}
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-white/15 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20 shadow-2xl">
            <div class="flex items-center space-x-3">
              <svg class="w-6 h-6 text-naranja-arcilla-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
              </svg>
              <div>
                <span class="text-sm opacity-80 block">Gran Final</span>
                <div class="font-bold text-lg">
                  {{ formatDate(currentTournament?.fecha_fin) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link 
            to="/cuadros" 
            class="group bg-white text-azul-marino-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
          >
            <span class="flex items-center justify-center">
              <svg class="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              Ver Cuadros y Resultados
            </span>
          </router-link>
          
          <router-link 
            to="/agenda" 
            class="group border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-azul-marino-900 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
          >
            <span class="flex items-center justify-center">
              <svg class="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Agendar Partidos
            </span>
          </router-link>
        </div>

        <!-- Scroll indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg class="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>

    <!-- Estadísticas destacadas -->
    <section class="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"></div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold copa-litoral-text mb-4">Copa Litoral en Números</h2>
          <p class="text-xl text-gray-600 dark:text-gray-400">La competencia que une a la comunidad tenística</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-azul-marino-500 to-azul-marino-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
            <h3 class="text-4xl font-bold copa-litoral-text mb-2">{{ players.length }}</h3>
            <p class="text-gray-600 dark:text-gray-400 font-medium">Jugadores Registrados</p>
          </div>
          
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-naranja-arcilla-500 to-naranja-arcilla-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
            </div>
            <h3 class="text-4xl font-bold copa-litoral-text mb-2">{{ categories.length }}</h3>
            <p class="text-gray-600 dark:text-gray-400 font-medium">Categorías</p>
          </div>
          
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
            </div>
            <h3 class="text-4xl font-bold copa-litoral-text mb-2">{{ matches.length }}</h3>
            <p class="text-gray-600 dark:text-gray-400 font-medium">Partidos Programados</p>
          </div>
          
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
              </svg>
            </div>
            <h3 class="text-4xl font-bold copa-litoral-text mb-2">{{ completedMatches }}</h3>
            <p class="text-gray-600 dark:text-gray-400 font-medium">Partidos Completados</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Últimos resultados -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold copa-litoral-text mb-4">Últimos Resultados</h2>
          <p class="text-xl text-gray-600 dark:text-gray-400">Los partidos más recientes del torneo</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="match in recentMatches" 
            :key="match.id"
            class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
          >
            <div class="p-6">
              <div class="flex justify-between items-center mb-4">
                <span class="text-sm font-medium text-naranja-arcilla-600 bg-naranja-arcilla-100 px-3 py-1 rounded-full">
                  {{ match.CategoriaNombre }}
                </span>
                <span class="text-sm font-medium text-azul-marino-600 bg-azul-marino-100 px-3 py-1 rounded-full">
                  {{ match.fase }}
                </span>
              </div>
              
              <div class="space-y-3 mb-6">
                <div class="flex justify-between items-center p-3 rounded-lg" :class="match.ganador_id === match.jugador1_id ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-800'">
                  <span class="font-semibold text-gray-900 dark:text-white">{{ match.Jugador1Nombre }}</span>
                  <span class="text-2xl font-bold" :class="match.ganador_id === match.jugador1_id ? 'text-green-600' : 'text-gray-500'">
                    {{ match.resultado_sets_j1 || 0 }}
                  </span>
                </div>
                <div class="flex justify-between items-center p-3 rounded-lg" :class="match.ganador_id === match.jugador2_id ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-800'">
                  <span class="font-semibold text-gray-900 dark:text-white">{{ match.Jugador2Nombre }}</span>
                  <span class="text-2xl font-bold" :class="match.ganador_id === match.jugador2_id ? 'text-green-600' : 'text-gray-500'">
                    {{ match.resultado_sets_j2 || 0 }}
                  </span>
                </div>
              </div>
              
              <div class="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span>{{ formatDate(match.fecha_agendada) }}</span>
                <span v-if="match.ganador_id" class="flex items-center text-green-600">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Finalizado
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <router-link to="/cuadros" class="btn-primary text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
            Ver Todos los Resultados
          </router-link>
        </div>
      </div>
    </section>

    <!-- Próximos partidos -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold copa-litoral-text mb-4">Próximos Partidos</h2>
          <p class="text-xl text-gray-600 dark:text-gray-400">No te pierdas los enfrentamientos más esperados</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="match in upcomingMatches" 
            :key="match.id"
            class="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
          >
            <div class="p-6">
              <div class="flex justify-between items-center mb-4">
                <span class="text-sm font-medium text-naranja-arcilla-600 bg-naranja-arcilla-100 px-3 py-1 rounded-full">
                  {{ match.CategoriaNombre }}
                </span>
                <span class="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                  {{ match.fase }}
                </span>
              </div>
              
              <div class="space-y-3 mb-6">
                <div class="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <span class="font-semibold text-gray-900 dark:text-white">{{ match.Jugador1Nombre }}</span>
                  <span class="text-sm text-gray-500">VS</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <span class="font-semibold text-gray-900 dark:text-white">{{ match.Jugador2Nombre }}</span>
                </div>
              </div>
              
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-600 dark:text-gray-400">
                  {{ match.fecha_agendada ? formatDate(match.fecha_agendada) : 'Por programar' }}
                  {{ match.hora_agendada ? ` - ${match.hora_agendada}` : '' }}
                </span>
                <span class="px-2 py-1 rounded-full text-xs font-medium" :class="getStatusClass(match.estado)">
                  {{ getStatusText(match.estado) }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <router-link to="/agenda" class="btn-secondary text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
            Ver Agenda Completa
          </router-link>
        </div>
      </div>
    </section>

    <!-- Call to action -->
    <section class="py-20 copa-litoral-gradient text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-azul-marino-900/90 to-naranja-arcilla-600/90"></div>
      <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-6">¿Listo para Competir?</h2>
        <p class="text-xl mb-8 opacity-90">
          Únete a la comunidad tenística más activa de la región litoral
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/contacto" class="bg-white text-azul-marino-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1">
            Contactar Organizadores
          </router-link>
          <a href="https://wa.me/56912345678" target="_blank" class="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-azul-marino-900 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1">
            WhatsApp Directo
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useTournamentStore } from '../stores/tournament';

const tournamentStore = useTournamentStore();

const currentTournament = computed(() => tournamentStore.currentTournament);
const categories = computed(() => tournamentStore.categories);
const players = computed(() => tournamentStore.players);
const matches = computed(() => tournamentStore.matches);

const recentMatches = computed(() => {
  return matches.value
    .filter(match => match.resultado_aprobado && match.ganador_id)
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 6);
});

const upcomingMatches = computed(() => {
  const now = new Date();
  return matches.value
    .filter(match => {
      if (!match.fecha_agendada) return match.estado === 'pendiente';
      const matchDate = new Date(match.fecha_agendada);
      return matchDate >= now && match.estado !== 'finalizado';
    })
    .sort((a, b) => {
      if (!a.fecha_agendada && !b.fecha_agendada) return 0;
      if (!a.fecha_agendada) return 1;
      if (!b.fecha_agendada) return -1;
      return new Date(a.fecha_agendada).getTime() - new Date(b.fecha_agendada).getTime();
    })
    .slice(0, 6);
});

const completedMatches = computed(() => {
  return matches.value.filter(match => match.estado === 'finalizado').length;
});

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Por definir';
  return new Date(dateString).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'programado':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'en_curso':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'finalizado':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'pendiente':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'programado':
      return 'Programado';
    case 'en_curso':
      return 'En Curso';
    case 'finalizado':
      return 'Finalizado';
    case 'pendiente':
      return 'Pendiente';
    default:
      return status;
  }
};

onMounted(async () => {
  await tournamentStore.loadInitialData();
});
</script>