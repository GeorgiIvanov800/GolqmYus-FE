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
    <div class="album-book text-center">
        <!-- Book Cover (Full Image) -->
        <div class="relative w-64 h-80 bg-gray-200 rounded-lg overflow-hidden shadow-lg"
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
}

.album-book img {
    object-fit: cover;
    width: 100%;
    height: 100%;
}

.album-book:hover img {
    transform: scale(1.05);
    transition: transform 0.3s ease-in-out;
}
</style>