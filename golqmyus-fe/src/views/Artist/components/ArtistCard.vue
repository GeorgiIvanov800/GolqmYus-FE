<script setup lang="ts">
import { Card, Button, ScrollPanel } from 'primevue';
import type { Artist } from '../types/Artist';
import { useRoute } from 'vue-router';



const props = defineProps<Artist>();
const router = useRoute();
console.log(props.socialMediaLinks);
const getIconPath = (platform: string) => {
    try {
        if (platform.toLowerCase() === 'official website') {
            return new URL('../../../assets/icons/internet.png', import.meta.url).href;
        }
        return new URL(`../../../assets/icons/${platform.toLowerCase()}.png`, import.meta.url).href
    } catch (e) {
        console.log(e);
        return ''
    }
};
</script>

<template>
    <Card style="width: 20rem; overflow: hidden"
        class="bg-gray-800 text-white rounded-lg border border-gray-700 shadow-lg">
        <template #header>
            <img alt="user header" :src="pictureUrl" />
            <div class="flex justify-center gap-6 mt-4">
                <a v-for="(url, platform) in props.socialMediaLinks" :key="platform" :href="url" target="_blank"
                    rel="noopener noreferrer" class="hover:opacity-80 transition-opacity duration-200">
                    <img :src="getIconPath(platform)" :alt="`${platform} Icon`" class="w-8 h-8" />
                </a>
            </div>
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
            </div>

        </template>
    </Card>

</template>

<style scoped>
:deep(.p-scrollpanel-bar.p-scrollpanel-bar-y) {
    background-color: #ffffff !important;

}
</style>