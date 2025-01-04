<script setup lang="ts">
import { ref } from 'vue';
import Menubar from 'primevue/menubar';
import { Button } from 'primevue';
import LoginComponent from './LoginComponent.vue';
//Control the visibility of the LoginComponent
const loginVisible = ref(false);

const menuItems = [
    { label: 'Начало', icon: 'pi pi-home custom-icon', },
    { label: 'Албуми', icon: 'pi pi-headphones custom-icon', },
    { label: 'Турнета', icon: 'pi pi-calendar custom-icon', },
    { label: 'Изпълнители', icon: 'pi pi-prime custom-icon', },
    { label: 'За нас', icon: 'pi pi-info-circle custom-icon', },
];

</script>

<template>

    <Menubar :model="menuItems">
        <template #start>
            <img src="../assets/icons/golqmYusLogo.jpg" alt="GolqmYus Logo" class="logo" />
        </template>
        <template #end>
            <div class="flex items-center gap-2">
                <LoginComponent />
            </div>
        </template>
    </Menubar>
</template>

<style scoped>
.logo {
    height: 45px;
    margin-right: 10px;
    border-radius: 15px;
}

::v-deep(.custom-icon) {
    font-size: 1.7rem;
}
</style>