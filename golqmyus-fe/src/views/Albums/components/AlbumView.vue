<script setup lang="ts">
import AlbumCoverView from './AlbumCoverView.vue';
import { useRouter } from 'vue-router';
import apiClient from '@/config/axios';
import { onMounted, ref } from 'vue';
import type { Album } from '../types/Album';

const albums = ref<Album[]>([]);
const router = useRouter();

onMounted(() => {
    fetchAlbums();
})
const handleAlbumSelect = (albumId: string) => {
    router.push(`/albums/${albumId}`);
}

const fetchAlbums = async () => {
    try {
        const response = await apiClient.get<Album[]>('/albums');
        albums.value = response.data;
    } catch (error) {
        console.log(error);
    }
}
</script>

<template>
    <div
        class="album-container w-full flex justify-center items-center px-4 md:px-8 pt-12 pb-28 bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div v-if="$route.name === 'albums'" class="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-96 gap-y-24">
            <AlbumCoverView v-for="album in albums" :key="album.id" v-bind="album" @selectAlbum="handleAlbumSelect" />
        </div>
        <router-view />
    </div>
</template>

<style scoped>
.album-container {
    min-height: 78vh;
}
</style>
