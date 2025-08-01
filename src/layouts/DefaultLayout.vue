<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <router-link to="/" class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-gradient-to-br from-azul-marino-600 to-naranja-arcilla-500 rounded-full flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
              </div>
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
              class="text-gray-700 dark:text-gray-300 hover:text-naranja-arcilla-500 dark:hover:text-naranja-arcilla-400 transition-colors font-medium"
              :class="{ 'text-naranja-arcilla-500 dark:text-naranja-arcilla-400 font-medium': $route.name === 'home' }"
            >
              Inicio
            </router-link>
            <router-link 
              to="/cuadros" 
              class="text-gray-700 dark:text-gray-300 hover:text-naranja-arcilla-500 dark:hover:text-naranja-arcilla-400 transition-colors font-medium"
              :class="{ 'text-naranja-arcilla-500 dark:text-naranja-arcilla-400 font-medium': $route.name === 'brackets' }"
            >
              Cuadros
            </router-link>
            <router-link 
              to="/agenda" 
              class="text-gray-700 dark:text-gray-300 hover:text-naranja-arcilla-500 dark:hover:text-naranja-arcilla-400 transition-colors font-medium"
              :class="{ 'text-naranja-arcilla-500 dark:text-naranja-arcilla-400 font-medium': $route.name === 'schedule' }"
            >
              Agenda
            </router-link>
            <router-link 
              to="/historial" 
              class="text-gray-700 dark:text-gray-300 hover:text-naranja-arcilla-500 dark:hover:text-naranja-arcilla-400 transition-colors font-medium"
              :class="{ 'text-naranja-arcilla-500 dark:text-naranja-arcilla-400 font-medium': $route.name === 'history' }"
            >
              Historial
            </router-link>
            <router-link 
              to="/auspiciadores" 
              class="text-gray-700 dark:text-gray-300 hover:text-naranja-arcilla-500 dark:hover:text-naranja-arcilla-400 transition-colors font-medium"
              :class="{ 'text-naranja-arcilla-500 dark:text-naranja-arcilla-400 font-medium': $route.name === 'sponsors' }"
            >
              Auspiciadores
            </router-link>
            <router-link 
              to="/contacto" 
              class="text-gray-700 dark:text-gray-300 hover:text-naranja-arcilla-500 dark:hover:text-naranja-arcilla-400 transition-colors font-medium"
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
                class="btn-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
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
                class="text-sm text-azul-marino-600 hover:text-azul-marino-700 font-medium"
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
        <div class="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800">
          <router-link to="/" class="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium">Inicio</router-link>
          <router-link to="/cuadros" class="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium">Cuadros</router-link>
          <router-link to="/agenda" class="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium">Agenda</router-link>
          <router-link to="/historial" class="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium">Historial</router-link>
          <router-link to="/auspiciadores" class="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium">Auspiciadores</router-link>
          <router-link to="/contacto" class="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium">Contacto</router-link>
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
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-10 h-10 bg-gradient-to-br from-azul-marino-600 to-naranja-arcilla-500 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Copa Litoral</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              El torneo de tenis más prestigioso de la región litoral.
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-500">
              Uniendo la comunidad tenística desde 2020
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contacto</h3>
            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <a href="mailto:info@copalitoral.cl" class="text-gray-600 dark:text-gray-400 hover:text-naranja-arcilla-500">
                  info@copalitoral.cl
                </a>
              </div>
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <a href="tel:+56912345678" class="text-gray-600 dark:text-gray-400 hover:text-naranja-arcilla-500">
                  +56 9 1234 5678
                </a>
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Enlaces Rápidos</h3>
            <div class="space-y-2">
              <router-link to="/cuadros" class="block text-gray-600 dark:text-gray-400 hover:text-naranja-arcilla-500">Cuadros</router-link>
              <router-link to="/agenda" class="block text-gray-600 dark:text-gray-400 hover:text-naranja-arcilla-500">Agenda</router-link>
              <router-link to="/historial" class="block text-gray-600 dark:text-gray-400 hover:text-naranja-arcilla-500">Historial</router-link>
              <router-link to="/auspiciadores" class="block text-gray-600 dark:text-gray-400 hover:text-naranja-arcilla-500">Auspiciadores</router-link>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Síguenos</h3>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-gray-500">
                href="https://instagram.com/copalitoral" 
                target="_blank"
                class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg flex items-center justify-center hover:shadow-lg transition-shadow"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001z"/>
                </svg>
              </a>
              
              <a 
                href="https://wa.me/56912345678" 
                target="_blank"
                class="w-10 h-10 bg-green-500 text-white rounded-lg flex items-center justify-center hover:shadow-lg transition-shadow"
              >
                <span class="sr-only">WhatsApp</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p class="text-gray-500 dark:text-gray-400">
            © 2025 Copa Litoral. Todos los derechos reservados. | 
            <span class="copa-litoral-accent font-medium">Desarrollado con ❤️ para la comunidad tenística</span>
          </p>
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