<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import LoginComponent from './components/LoginComponent.vue';

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

}

.main-content {
  flex: 1;
}
</style>
