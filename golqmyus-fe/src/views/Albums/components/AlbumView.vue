<script setup lang="ts">
import { mockAlbums } from '@/mock/albums';
import AlbumCoverView from './AlbumCoverView.vue';
import { useRouter } from 'vue-router';


const router = useRouter();

const handleAlbumSelect = (albumId: string) => {
    router.push(`/albums/${albumId}`);
}

</script>

<template>
    <div
        class="album-container w-full flex justify-center items-center px-4 md:px-8 pt-12 pb-28 bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div v-if="$route.name === 'albums'" class="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-96 gap-y-24">
            <AlbumCoverView v-for="(album, index) in mockAlbums" :key="index" v-bind="album"
                @selectAlbum="handleAlbumSelect" />
        </div>
        <router-view />
    </div>
</template>

<style scoped>
.album-container {
    min-height: 78vh;
}
</style>
