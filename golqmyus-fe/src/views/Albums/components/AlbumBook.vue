<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Album } from '../types/Album';

const props = defineProps<Album>();

const isOpen = ref(false);


//Methods
const toggleOpen = () => {
    isOpen.value = !isOpen.value;
}

//Computed
const formatDate = computed(() => {
    return new Date(props.releaseDate).toLocaleDateString('bg-BG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
});

</script>

<template>
    <div class="album-book relative text-center">
        <!-- Book Spine -->
        <div class="absolute top-0 left-0 w-8 h-80 bg-gray-800 shadow-inner rounded-l-lg"></div>

        <!-- Book Cover -->
        <div class="relative w-64 h-80 bg-gray-200 rounded-r-lg overflow-hidden shadow-lg ml-8"
            :style="{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
            @click="toggleOpen">
            <!-- Optional overlay on hover -->
            <div class="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity"></div>
        </div>

        <!-- Album Name Below -->
        <h3 class="mt-4 text-lg font-bold text-gray-800">{{ title }}</h3>
    </div>
</template>

<style scoped>
.album-book {
    cursor: pointer;
    display: inline-block;
    perspective: 1000px;
    /* Enables 3D effects */
}

.album-book:hover .relative {
    transform: scale(1.03);
    /* Slight zoom on hover */
    transition: transform 0.3s ease-in-out;
}

.album-book .absolute {
    transition: all 0.3s ease;
}

.album-book:hover .absolute {
    transform: translateX(-2px);
    /* Simulates book shifting slightly */
}
</style>