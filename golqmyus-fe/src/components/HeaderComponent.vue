<script setup lang="ts">
import Menubar from 'primevue/menubar';
import LoginComponent from './LoginComponent.vue';
import { useRoute, useRouter } from 'vue-router';


const router = useRouter();

const menuItems = [
    { label: 'Начало', icon: 'pi pi-home custom-icon', command: () => router.push('/') },
    { label: 'Албуми', icon: 'pi pi-headphones custom-icon', command: () => router.push('/albums') },
    { label: 'Quiz', icon: 'pi pi-calendar custom-icon', command: () => router.push('/quiz') },
    { label: 'Изпълнители', icon: 'pi pi-prime custom-icon', command: () => router.push('/artists') },
    { label: 'За нас', icon: 'pi pi-info-circle custom-icon', },
];

</script>

<template>
    <header class="fixed top-0 left-0 w-full z-50">
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
    </header>
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