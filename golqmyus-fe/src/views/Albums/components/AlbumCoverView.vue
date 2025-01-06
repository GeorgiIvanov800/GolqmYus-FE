<script setup lang="ts">
import type { Album } from '../types/Album';

const { id, title, imageUrl } = defineProps<Album>();

const emit = defineEmits(['selectAlbum']);
</script>

<template>
    <div class="album-wrapper relative w-72 h-72" @click="$emit('selectAlbum', id)">
        <img src="../images/Vynil.png" alt="Vinyl Record"
            class="vinyl absolute -right-28 top-1/2 transform -translate-y-1/2 w-80 h-72 z-0" />
        <div class="album-cover w-full h-full bg-black rounded-lg overflow-hidden relative z-10">
            <img :src="imageUrl" :alt="title" class="w-full h-full object-cover" />
        </div>
        <h3 class="mt-2 text-lg font-bold text-center text-white tracking-wider drop-shadow-md">{{ title }}</h3>
    </div>
</template>


<style scoped>
.album-wrapper:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
    cursor: pointer;
}
</style>