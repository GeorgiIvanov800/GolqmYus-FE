<script setup lang="ts">
import { ref } from 'vue';
import Menubar from 'primevue/menubar';
import { Button } from 'primevue';
//Control the visibility of the LoginComponent
const loginVisible = ref(false);

const menuItems = [
    { label: 'Начало', icon: 'pi pi-home', },
    { label: 'Албуми', icon: 'pi pi-headphones', },
    { label: 'Турнета', icon: 'pi pi-calendar', },
    { label: 'Изпълнители', icon: 'pi pi-prime', },
    { label: 'За нас', icon: 'pi pi-info-circle', },
];

</script>

<template>

    <Menubar :model="menuItems">
        <template #start>
            <img src="../assets/icons/golqmYusLogo.jpg" alt="GolqmYus Logo" class="logo" />
        </template>
        <template #end>
            <div class="flex items-center gap-2">
                <Button label="Login/Register" icon="pi pi-user" @click="loginVisible = true" />
            </div>
        </template>
    </Menubar>
</template>

<style scoped>
.site-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
}

.logo {
    height: 50px;
    margin-right: 10px;
    border-radius: 15px;
}
</style>