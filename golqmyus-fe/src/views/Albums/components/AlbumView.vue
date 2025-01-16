<script setup lang="ts">
import AlbumCoverView from './AlbumCoverView.vue';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import type { Album } from '../types/Album';
import { fetchAlbums } from '@/services/albumService';
import { useLoaderStore } from '@/stores/loaderStore';


const albums = ref<Album[]>([]);
const router = useRouter();
const route = useRoute();
const loaderStore = useLoaderStore();


const fetchAlbumsForRoute = async () => {
    const artistId = route.params.artistId as string | undefined;
    try {
        loaderStore.showLoader();
        albums.value = await fetchAlbums(artistId);
        loaderStore.hideLoader();
    } catch (error) {
        console.error('Error fetching albums:', error);
    }
};

onMounted(fetchAlbumsForRoute);
const handleAlbumSelect = (albumId: string) => {
    router.push(`/albums/${albumId}`);
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
