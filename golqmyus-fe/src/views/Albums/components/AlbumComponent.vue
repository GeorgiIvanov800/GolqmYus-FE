<script setup lang="ts">
import { ref } from 'vue';
import AlbumBook from './AlbumBook.vue';
import { mockAlbums } from '@/mock/albums';
import OpenedBook from './OpenedBook.vue';
import type { Album } from '../types/Album'; // Import your Album type/interface

// Track the currently zoomed album
const zoomedAlbum = ref<Album | null>(null);

// Method to open the book
const openBook = (album: Album) => {
    console.log('Opening book:', album);
    zoomedAlbum.value = album;
};

// Method to close the book
const closeBook = () => {
    zoomedAlbum.value = null;
};
</script>

<template>
    <div class="album-container flex flex-col items-center justify-center w-full px-8 pt-32 pb-20">
        <div class="grid grid-cols-4 gap-[10rem]">
            <AlbumBook v-for="(album, index) in mockAlbums" :key="index" v-bind="album" @toggleZoom="openBook(album)">
                <!-- Pass OpenedBook into the slot -->
                <OpenedBook v-if="zoomedAlbum?.title === album.title" v-bind="album" @close="closeBook" />
            </AlbumBook>
        </div>
    </div>
</template>

<style scoped>
.album-container {
    position: relative;
}

/* Grid Layout */
.grid {
    position: relative;
    /* Ensures layout integrity */
}

/* Transition Styles for OpenedBook */
.fade-zoom-enter-active,
.fade-zoom-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-zoom-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.fade-zoom-leave-to {
    opacity: 0;
    transform: scale(0.8);
}
</style>
