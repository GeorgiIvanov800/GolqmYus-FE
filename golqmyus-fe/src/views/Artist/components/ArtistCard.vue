<script setup lang="ts">
import { Card, Button, ScrollPanel } from 'primevue';
import type { Artist } from '../types/Artist';
import { useRoute } from 'vue-router';


const props = defineProps<Artist>();
const router = useRoute();
</script>

<template>
    <Card style="width: 20rem; overflow: hidden"
        class="bg-gray-800 text-white rounded-lg border border-gray-700 shadow-lg">
        <template #header>
            <img alt="user header" :src="pictureUrl" />
        </template>
        <template #title>{{ `${props.firstName} ${props.lastName}` }}</template>
        <template #subtitle>{{ props.nickname }}</template>
        <template #content>
            <ScrollPanel style="width: 100%; height: 200px">
                <p>
                    {{ props.biography }}
                </p>
            </ScrollPanel>
        </template>
        <template #footer>
            <div class="flex gap-4 mt-1">
                <Button as="router-link" :to="{ name: 'albums', params: { artistId: props.id } }" label="Албуми"
                    outlined class="w-full" />
                <!-- <Button as="router-link" label="Албуми" outlined class="w-full" /> -->
                <Button label="Save" class="w-full" />
            </div>
        </template>
    </Card>
</template>

<style scoped>
:deep(.p-scrollpanel-bar.p-scrollpanel-bar-y) {
    background-color: #ffffff !important;
    /* Force the background color to white */
}
</style>