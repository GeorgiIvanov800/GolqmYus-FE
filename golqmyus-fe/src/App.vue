<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import { Toast } from 'primevue';
</script>

<template>

  <div class="flex flex-col min-h-screen">
    <HeaderComponent />
    <main class="flex-1 pt-20">
      <RouterView />
    </main>
    <FooterComponent />
    <Toast />
  </div>

</template>

<style scoped></style>
