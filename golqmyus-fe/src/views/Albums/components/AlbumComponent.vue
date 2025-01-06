<script setup lang="ts">
import { mockAlbums } from '@/mock/albums';
import AlbumCoverComponent from './AlbumCoverComponent.vue';

</script>

<template>
    <div class="album-container flex flex-col items-center justify-center w-full px-8 pt-24 pb-20">
        <!-- Grid for Albums -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-64 gap-y-24">
            <AlbumCoverComponent v-for="(album, index) in mockAlbums" :key="index" v-bind="album" />
        </div>
    </div>
</template>

<style scoped></style>
