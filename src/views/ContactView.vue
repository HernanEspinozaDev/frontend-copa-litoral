<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Contacto</h1>
        <p class="text-gray-600 dark:text-gray-400">¿Tienes preguntas? Estamos aquí para ayudarte</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class="card">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Envíanos un mensaje</h2>
          
          <form @submit.prevent="submitForm" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nombre completo *
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Correo electrónico *
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Teléfono
              </label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="+56 9 1234 5678"
              />
            </div>

            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Asunto *
              </label>
              <select
                id="subject"
                v-model="form.subject"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Selecciona un asunto</option>
                <option value="inscripcion">Inscripción al torneo</option>
                <option value="horarios">Consultas sobre horarios</option>
                <option value="resultados">Consultas sobre resultados</option>
                <option value="auspicio">Oportunidades de auspicio</option>
                <option value="general">Consulta general</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Mensaje *
              </label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="5"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="submitting"
              class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="submitting">Enviando...</span>
              <span v-else>Enviar mensaje</span>
            </button>
          </form>
        </div>

        <!-- Contact Information -->
        <div class="space-y-8">
          <!-- Main Contact -->
          <div class="card">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Información de contacto</h2>
            <div class="space-y-4">
              <div class="flex items-start">
                <svg class="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">Email</p>
                  <a href="mailto:info@copalitoral.cl" class="text-primary-600 dark:text-primary-400 hover:underline">
                    info@copalitoral.cl
                  </a>
                </div>
              </div>

              <div class="flex items-start">
                <svg class="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">Teléfono</p>
                  <a href="tel:+56912345678" class="text-primary-600 dark:text-primary-400 hover:underline">
                    +56 9 1234 5678
                  </a>
                </div>
              </div>

              <div class="flex items-start">
                <svg class="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">Ubicación</p>
                  <p class="text-gray-600 dark:text-gray-400">
                    Club de Tenis Litoral<br>
                    Av. Costanera 1234<br>
                    Viña del Mar, Chile
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Media -->
          <div class="card">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Síguenos</h2>
            <div class="flex space-x-4">
              <a 
                href="https://instagram.com/copalitoral" 
                target="_blank"
                class="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-shadow"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.321-1.297C4.198 14.553 3.5 13.297 3.5 12s.698-2.553 1.628-3.691c.873-.807 2.024-1.297 3.321-1.297 1.297 0 2.448.49 3.321 1.297.93 1.138 1.628 2.394 1.628 3.691s-.698 2.553-1.628 3.691c-.873.807-2.024 1.297-3.321 1.297z"/>
                </svg>
              </a>
              
              <a 
                href="https://facebook.com/copalitoral" 
                target="_blank"
                class="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              <a 
                href="https://wa.me/56912345678" 
                target="_blank"
                class="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-lg hover:shadow-lg transition-shadow"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Office Hours -->
          <div class="card">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Horarios de atención</h2>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Lunes - Viernes:</span>
                <span class="text-gray-900 dark:text-white font-medium">9:00 - 18:00</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Sábados:</span>
                <span class="text-gray-900 dark:text-white font-medium">9:00 - 14:00</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Domingos:</span>
                <span class="text-gray-900 dark:text-white font-medium">Solo torneos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
const submitting = ref(false);

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
});

const submitForm = async () => {
  submitting.value = true;
  
  try {
    // Simular envío del formulario
    // En una implementación real, aquí se enviaría el formulario a la API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Mensaje enviado correctamente. Te contactaremos pronto.');
    
    // Limpiar formulario
    Object.keys(form).forEach(key => {
      form[key as keyof typeof form] = '';
    });
  } catch (error) {
    toast.error('Error al enviar el mensaje. Por favor, inténtalo nuevamente.');
  } finally {
    submitting.value = false;
  }
};
</script>