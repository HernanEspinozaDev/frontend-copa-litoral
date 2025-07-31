import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

// Vistas públicas
import HomeView from '../views/HomeView.vue';
import BracketsView from '../views/BracketsView.vue';
import ScheduleView from '../views/ScheduleView.vue';
import HistoryView from '../views/HistoryView.vue';
import SponsorsView from '../views/SponsorsView.vue';
import ContactView from '../views/ContactView.vue';
import AuthView from '../views/AuthView.vue';

// Vistas de administración
import AdminDashboardView from '../views/admin/AdminDashboardView.vue';
import PlayerManagementView from '../views/admin/PlayerManagementView.vue';
import MatchManagementView from '../views/admin/MatchManagementView.vue';
import TournamentManagementView from '../views/admin/TournamentManagementView.vue';
import CategoryManagementView from '../views/admin/CategoryManagementView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { layout: 'default' }
    },
    {
      path: '/cuadros',
      name: 'brackets',
      component: BracketsView,
      meta: { layout: 'default' }
    },
    {
      path: '/agenda',
      name: 'schedule',
      component: ScheduleView,
      meta: { layout: 'default' }
    },
    {
      path: '/historial',
      name: 'history',
      component: HistoryView,
      meta: { layout: 'default' }
    },
    {
      path: '/auspiciadores',
      name: 'sponsors',
      component: SponsorsView,
      meta: { layout: 'default' }
    },
    {
      path: '/contacto',
      name: 'contact',
      component: ContactView,
      meta: { layout: 'default' }
    },
    {
      path: '/login',
      name: 'login',
      component: AuthView,
      meta: { layout: 'default', guest: true }
    },
    {
      path: '/admin',
      name: 'admin-dashboard',
      component: AdminDashboardView,
      meta: { layout: 'admin', requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/jugadores',
      name: 'admin-players',
      component: PlayerManagementView,
      meta: { layout: 'admin', requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/partidos',
      name: 'admin-matches',
      component: MatchManagementView,
      meta: { layout: 'admin', requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/torneos',
      name: 'admin-tournaments',
      component: TournamentManagementView,
      meta: { layout: 'admin', requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/categorias',
      name: 'admin-categories',
      component: CategoryManagementView,
      meta: { layout: 'admin', requiresAuth: true, requiresAdmin: true }
    }
  ]
});

// Guards de navegación
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  
  // Verificar autenticación al cargar la aplicación
  if (!authStore.isAuthenticated && localStorage.getItem('auth_token')) {
    await authStore.checkAuth();
  }

  // Verificar si la ruta requiere autenticación
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
    return;
  }

  // Verificar si la ruta requiere rol de administrador
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next('/');
    return;
  }

  // Redirigir usuarios autenticados lejos de la página de login
  if (to.meta.guest && authStore.isAuthenticated) {
    next('/');
    return;
  }

  next();
});

export default router;