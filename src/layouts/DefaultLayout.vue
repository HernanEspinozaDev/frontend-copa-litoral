<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <router-link to="/" class="flex items-center space-x-3">
              <img 
                src="https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Copa Litoral" 
                class="h-10 w-10 rounded-full object-cover"
              >
              <div>
                <h1 class="text-xl font-bold text-gray-900 dark:text-white">Copa Litoral</h1>
                <p class="text-sm text-gray-500 dark:text-gray-400">Tenis 2025</p>
              </div>
            </router-link>
          </div>

          <!-- Navigation -->
          <nav class="hidden md:flex items-center space-x-8">
            <router-link 
              to="/" 
              class="text-gray-700 dark:text-gray-300 hover:text-naranja-arcilla-500 dark:hover:text-naranja-arcilla-400 transition-colors"
              :class="{ 'text-naranja-arcilla-500 dark:text-naranja-arcilla-400 font-medium': $route.name === 'home' }"
            >
              Inicio
            </router-link>
            <router-link 
              to="/cuadros" 
              class="text-gray-700 dark:text-gray-300 hover:text-naranja-arcilla-500 dark:hover:text-naranja-arcilla-400 transition-colors"
              :class="{ 'text-naranja-arcilla-500 dark:text-naranja-arcilla-400 font-medium': $route.name === 'brackets' }"
            >
              Cuadros
            </router-link>
            <router-link 
              to="/agenda" 
              class="text-gray-700 dark:text-gray-300 hover:text-naranja-arcilla-500 dark:hover:text-naranja-arcilla-400 transition-colors"
              :class="{ 'text-naranja-arcilla-500 dark:text-naranja-arcilla-400 font-medium': $route.name === 'schedule' }"
            >
              Agenda
            </router-link>
            <router-link 
              to="/historial" 
              class="text-gray-700 dark:text-gray-300 hover:text-naranja-arcilla-500 dark:hover:text-naranja-arcilla-400 transition-colors"
              :class="{ 'text-naranja-arcilla-500 dark:text-naranja-arcilla-400 font-medium': $route.name === 'history' }"
            >
              Historial
            </router-link>
            <router-link 
              to="/auspiciadores" 
              class="text-gray-700 dark:text-gray-300 hover:text-naranja-arcilla-500 dark:hover:text-naranja-arcilla-400 transition-colors"
              :class="{ 'text-naranja-arcilla-500 dark:text-naranja-arcilla-400 font-medium': $route.name === 'sponsors' }"
            >
              Auspiciadores
            </router-link>
            <router-link 
              to="/contacto" 
              class="text-gray-700 dark:text-gray-300 hover:text-naranja-arcilla-500 dark:hover:text-naranja-arcilla-400 transition-colors"
              :class="{ 'text-naranja-arcilla-500 dark:text-naranja-arcilla-400 font-medium': $route.name === 'contact' }"
            >
              Contacto
            </router-link>
          </nav>

          <!-- User menu -->
          <div class="flex items-center space-x-4">
            <!-- Dark mode toggle -->
            <button 
              @click="toggleDarkMode"
              class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <svg v-if="isDark" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            </button>

            <!-- Auth buttons -->
            <div v-if="!authStore.isAuthenticated">
              <router-link 
                to="/login" 
                class="btn-primary"
              >
                Iniciar Sesión
              </router-link>
            </div>
            <div v-else class="flex items-center space-x-3">
              <span class="text-sm text-gray-700 dark:text-gray-300">
                Hola, {{ authStore.user?.nombre_usuario }}
              </span>
              <router-link 
                v-if="authStore.isAdmin" 
                to="/admin" 
                class="text-sm text-primary-600 hover:text-primary-700"
              >
                Admin
              </router-link>
              <button 
                @click="authStore.logout()" 
                class="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Salir
              </button>
            </div>
          </div>

          <!-- Mobile menu button -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200 dark:border-gray-700">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link to="/" class="block px-3 py-2 text-gray-700 dark:text-gray-300">Inicio</router-link>
          <router-link to="/cuadros" class="block px-3 py-2 text-gray-700 dark:text-gray-300">Cuadros</router-link>
          <router-link to="/agenda" class="block px-3 py-2 text-gray-700 dark:text-gray-300">Agenda</router-link>
          <router-link to="/historial" class="block px-3 py-2 text-gray-700 dark:text-gray-300">Historial</router-link>
          <router-link to="/auspiciadores" class="block px-3 py-2 text-gray-700 dark:text-gray-300">Auspiciadores</router-link>
          <router-link to="/contacto" class="block px-3 py-2 text-gray-700 dark:text-gray-300">Contacto</router-link>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Copa Litoral</h3>
            <p class="text-gray-600 dark:text-gray-400">
              El torneo de tenis más prestigioso de la región litoral.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contacto</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Email: info@copalitoral.cl<br>
              Teléfono: +56 9 1234 5678
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Síguenos</h3>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-gray-500">
                <span class="sr-only">Instagram</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.321-1.297C4.198 14.553 3.5 13.297 3.5 12s.698-2.553 1.628-3.691c.873-.807 2.024-1.297 3.321-1.297 1.297 0 2.448.49 3.321 1.297.93 1.138 1.628 2.394 1.628 3.691s-.698 2.553-1.628 3.691c-.873.807-2.024 1.297-3.321 1.297z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p class="text-gray-500 dark:text-gray-400">© 2025 Copa Litoral. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const mobileMenuOpen = ref(false);
const isDark = ref(false);

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
  }
};

onMounted(() => {
  // Check for saved dark mode preference
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'true') {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  }
});
</script>