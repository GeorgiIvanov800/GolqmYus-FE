<script setup lang="ts">
import type { Album } from '../types/Album';


const props = defineProps<Album>();
</script>

<template>

    <div class="album-wrapper relative w-64 h-64 ">

        <img src="../images/Vynil.png" alt="Vinyl Record"
            class="vinyl absolute -right-28 top-1/2 transform -translate-y-1/2 w-70 h-70 z-0" />

        <div class="album-cover w-full h-full bg-black rounded-lg overflow-hidden shadow-lg relative z-10">
            <img :src="imageUrl" :alt="title" class="w-full h-full object-cover" />
        </div>
        <h3 class="mt-4 text-lg font-bold text-center text-white">{{ title }}</h3>
    </div>
</template>
