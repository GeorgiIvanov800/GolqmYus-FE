<script setup lang="ts">
import { ref } from 'vue';
import AlbumBook from './AlbumBook.vue';
import { mockAlbums } from '@/mock/albums';

// Track the currently zoomed album
const zoomedAlbum = ref<number | null>(null);

const setZoomState = (state: boolean, index: number) => {
    if (state) {
        zoomedAlbum.value = index; // Set zoomed album index
    } else {
        zoomedAlbum.value = null; // Reset zoomed album
    }
};
</script>

<template>
    <div class="album-container flex flex-col items-center justify-center w-full px-8 pt-32 pb-20">
        <div class="grid grid-cols-4 gap-[10rem]">
            <div v-for="(album, index) in mockAlbums" :key="index" class="album-wrapper"
                :class="{ 'blurred': zoomedAlbum !== null && zoomedAlbum !== index }">
                <AlbumBook v-bind="album" :index="index" @toggleZoom="(state) => setZoomState(state, index)" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.album-wrapper {
    transition: filter 0.3s ease;
}

.album-wrapper.blurred {
    filter: blur(5px);
    /* Blur only unzoomed albums */
}

.album-container {
    position: relative;
}

.grid {
    position: relative;
    /* Keep grid in relative layout */
}
</style>