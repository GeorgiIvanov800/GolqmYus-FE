<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import { Toast } from 'primevue';
import LoaderComponent from './components/LoaderComponent.vue';
import { useLoaderStore } from './stores/loaderStore';

const loader = useLoaderStore();

</script>

<template>

  <div class="flex flex-col min-h-screen">
    <HeaderComponent />
    <main class="flex-1 pt-[60px] flex flex-col items-center justify-center overflow-auto">
      <RouterView />
    </main>
    <FooterComponent />
    <Toast />
    <div v-if="loader.isLoading" class="loader-overlay">
      <LoaderComponent />
    </div>
  </div>

</template>

<style scoped>
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200;
}
</style>
