<script setup lang="ts">
import AlbumBook from './AlbumBook.vue';
import { mockAlbums } from '@/mock/albums';
</script>

<template>
    <div class="flex flex-col items-center justify-start w-full px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-40">
            <AlbumBook v-for="(album, index) in mockAlbums" :key="index" v-bind="album" />
        </div>
    </div>
</template>