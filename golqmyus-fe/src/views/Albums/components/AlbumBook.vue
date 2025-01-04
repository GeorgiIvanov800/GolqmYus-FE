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
    <div class="album-book relative w-48 h-64 border rounded-lg shadow-lg overflow-hidden cursor-pointer"
        @click="toggleOpen">
        <!-- Book Cover -->
        <div v-if="!isOpen" class="book-cover flex items-center justify-center bg-gray-800 text-white text-center p-4"
            :style="{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
            <h3 class="text-lg font-bold bg-black/50 p-2 rounded">{{ title }}</h3>
        </div>

        <!-- Opened Book -->
        <div v-else class="book-content bg-white p-4">
            <h3 class="text-xl font-bold">{{ title }}</h3>
            <p class="text-sm text-gray-500">{{ formatDate }}</p>
            <p class="text-sm font-medium text-gray-700 mb-4">{{ genre }}</p>
            <p class="text-sm text-gray-600 mb-2">{{ description }}</p>
            <ul class="tracklist list-disc pl-5">
                <li v-for="(track, index) in tracks" :key="index" class="text-sm text-gray-800">
                    {{ track }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.album-book {
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.album-book:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.book-cover {
    transition: opacity 0.3s ease-in-out;
}

.book-content {
    overflow-y: auto;
    max-height: 100%;
}
</style>