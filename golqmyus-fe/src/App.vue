<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue';
import { ref } from 'vue';
import FooterComponent from './components/FooterComponent.vue';

</script>

<template>

  <div class="app-container">
    <HeaderComponent />
    <main class="main-content">
      <RouterView />
    </main>
    <FooterComponent />
  </div>

</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* Ensures the container fills the viewport height */
}

.main-content {
  flex: 1;
  /* Makes the main content take up all available space */
}
</style>
