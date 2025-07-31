<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Auspiciadores</h1>
        <p class="text-gray-600 dark:text-gray-400">Empresas que hacen posible la Copa Litoral</p>
      </div>

      <!-- Main Sponsors -->
      <section class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Auspiciadores Principales</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="sponsor in mainSponsors" 
            :key="sponsor.id"
            class="card text-center hover:shadow-lg transition-shadow cursor-pointer group"
            @click="openSponsorDetails(sponsor)"
          >
            <div class="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
              <img 
                :src="sponsor.logo" 
                :alt="sponsor.name"
                class="max-w-full max-h-full object-contain p-4"
              />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ sponsor.name }}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">{{ sponsor.category }}</p>
            <p class="text-gray-500 dark:text-gray-500 text-sm">{{ sponsor.description }}</p>
          </div>
        </div>
      </section>

      <!-- Supporting Sponsors -->
      <section class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Auspiciadores Colaboradores</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <div 
            v-for="sponsor in supportingSponsors" 
            :key="sponsor.id"
            class="aspect-square bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex items-center justify-center hover:shadow-lg transition-shadow cursor-pointer group"
            @click="openSponsorDetails(sponsor)"
          >
            <img 
              :src="sponsor.logo" 
              :alt="sponsor.name"
              class="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform"
            />
          </div>
        </div>
      </section>

      <!-- Become a Sponsor -->
      <section class="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg text-white p-8 text-center">
        <h2 class="text-2xl font-bold mb-4">¿Quieres ser parte de la Copa Litoral?</h2>
        <p class="text-lg mb-6 opacity-90">
          Únete a nuestros auspiciadores y haz crecer tu marca junto al torneo de tenis más prestigioso de la región
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link 
            to="/contacto" 
            class="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contáctanos
          </router-link>
          <a 
            href="mailto:sponsors@copalitoral.cl" 
            class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
          >
            sponsors@copalitoral.cl
          </a>
        </div>
      </section>
    </div>

    <!-- Sponsor Details Modal -->
    <Modal v-if="showSponsorDetails" @close="showSponsorDetails = false">
      <div v-if="selectedSponsor" class="p-6">
        <div class="flex items-center mb-6">
          <img 
            :src="selectedSponsor.logo" 
            :alt="selectedSponsor.name"
            class="w-16 h-16 object-contain mr-4"
          />
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ selectedSponsor.name }}</h3>
            <p class="text-gray-600 dark:text-gray-400">{{ selectedSponsor.category }}</p>
          </div>
        </div>
        
        <div class="space-y-4">
          <div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Descripción</h4>
            <p class="text-gray-600 dark:text-gray-400">{{ selectedSponsor.description }}</p>
          </div>
          
          <div v-if="selectedSponsor.services">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Servicios</h4>
            <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
              <li v-for="service in selectedSponsor.services" :key="service">{{ service }}</li>
            </ul>
          </div>
          
          <div class="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <a 
              v-if="selectedSponsor.website" 
              :href="selectedSponsor.website" 
              target="_blank"
              class="btn-primary"
            >
              Visitar Sitio Web
            </a>
            <a 
              v-if="selectedSponsor.phone" 
              :href="`tel:${selectedSponsor.phone}`"
              class="btn-secondary"
            >
              {{ selectedSponsor.phone }}
            </a>
            <a 
              v-if="selectedSponsor.email" 
              :href="`mailto:${selectedSponsor.email}`"
              class="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
            >
              {{ selectedSponsor.email }}
            </a>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Modal from '../components/Modal.vue';

interface Sponsor {
  id: number;
  name: string;
  category: string;
  description: string;
  logo: string;
  website?: string;
  phone?: string;
  email?: string;
  services?: string[];
}

const showSponsorDetails = ref(false);
const selectedSponsor = ref<Sponsor | null>(null);

// Mock data - En una implementación real, estos datos vendrían de la API
const mainSponsors = ref<Sponsor[]>([
  {
    id: 1,
    name: 'Tennis Pro Shop',
    category: 'Equipamiento Deportivo',
    description: 'La tienda de tenis más completa de la región, con las mejores marcas y precios.',
    logo: 'https://images.pexels.com/photos/1192136/pexels-photo-1192136.jpeg?auto=compress&cs=tinysrgb&w=400',
    website: 'https://tennispro.cl',
    phone: '+56 9 8765 4321',
    email: 'info@tennispro.cl',
    services: ['Venta de raquetas', 'Encordado profesional', 'Indumentaria deportiva', 'Accesorios']
  },
  {
    id: 2,
    name: 'Hotel Costa Azul',
    category: 'Hotelería',
    description: 'Hotel de lujo frente al mar, el lugar perfecto para hospedarse durante el torneo.',
    logo: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=400',
    website: 'https://hotelcostaazul.cl',
    phone: '+56 9 1234 5678',
    email: 'reservas@hotelcostaazul.cl',
    services: ['Habitaciones de lujo', 'Spa y wellness', 'Restaurante gourmet', 'Transporte al torneo']
  },
  {
    id: 3,
    name: 'Banco Regional',
    category: 'Servicios Financieros',
    description: 'Tu partner financiero de confianza, apoyando el deporte local.',
    logo: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=400',
    website: 'https://bancoregional.cl',
    phone: '+56 600 123 456',
    email: 'contacto@bancoregional.cl',
    services: ['Cuentas corrientes', 'Créditos', 'Inversiones', 'Seguros']
  }
]);

const supportingSponsors = ref<Sponsor[]>([
  {
    id: 4,
    name: 'Restaurante El Faro',
    category: 'Gastronomía',
    description: 'Comida del mar con la mejor vista panorámica.',
    logo: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400',
    website: 'https://elfaro.cl',
    phone: '+56 9 8888 7777',
    email: 'reservas@elfaro.cl'
  },
  {
    id: 5,
    name: 'Ferremax',
    category: 'Ferretería',
    description: 'Todo lo que necesitas para construcción y reparaciones.',
    logo: 'https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&cs=tinysrgb&w=400',
    website: 'https://ferremax.cl',
    phone: '+56 9 7777 6666'
  },
  {
    id: 6,
    name: 'Farmacia Cruz Verde',
    category: 'Salud',
    description: 'Tu farmacia de confianza, siempre cerca.',
    logo: 'https://images.pexels.com/photos/3985165/pexels-photo-3985165.jpeg?auto=compress&cs=tinysrgb&w=400',
    website: 'https://cruzverde.cl',
    phone: '+56 600 200 300'
  },
  {
    id: 7,
    name: 'Café Central',
    category: 'Cafetería',
    description: 'El mejor café de la ciudad.',
    logo: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone: '+56 9 5555 4444',
    email: 'info@cafecentral.cl'
  },
  {
    id: 8,
    name: 'Óptica Visión',
    category: 'Óptica',
    description: 'Lentes y gafas de sol para deportistas.',
    logo: 'https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg?auto=compress&cs=tinysrgb&w=400',
    website: 'https://opticavision.cl'
  },
  {
    id: 9,
    name: 'Autoservicio Los Pinos',
    category: 'Supermercado',
    description: 'Todo lo que necesitas, cerca de casa.',
    logo: 'https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone: '+56 9 3333 2222'
  }
]);

const openSponsorDetails = (sponsor: Sponsor) => {
  selectedSponsor.value = sponsor;
  showSponsorDetails.value = true;
};
</script>