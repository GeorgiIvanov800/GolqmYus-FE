<script setup lang="ts">
import AlbumBook from './AlbumBook.vue';
import { mockAlbums } from '@/mock/albums';
</script>

<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AlbumBook v-for="(album, index) in mockAlbums" :key="index" v-bind="album" />
        </div>
    </div>
</template>