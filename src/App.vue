<template>
  <component :is="currentLayout">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth'
import DefaultLayout from './layouts/DefaultLayout.vue'
import AdminLayout from './layouts/AdminLayout.vue'

const route = useRoute()
const authStore = useAuthStore()

const currentLayout = computed(() => {
  if (route.meta.layout === 'admin') {
    return AdminLayout
  }
  return DefaultLayout
})

onMounted(async () => {
  await authStore.checkAuth()
})
</script>