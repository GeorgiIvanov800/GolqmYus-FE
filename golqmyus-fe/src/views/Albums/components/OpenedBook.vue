<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Album } from '../types/Album';

const props = defineProps<Album>();
const emit = defineEmits(['close']);
</script>

<template>
    <div class="opened-book-content">
        <!-- Close Button -->
        <button @click="emit('close')"
            class="absolute top-4 right-4 bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300">
            Close
        </button>

        <!-- Album Details -->
        <div class="flex flex-col md:flex-row items-center h-full">
            <!-- Cover Image -->
            <div class="book-cover w-64 h-80 bg-gray-200 rounded-lg overflow-hidden shadow-lg"
                :style="{ backgroundImage: `url(${props.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
            </div>

            <!-- Album Info -->
            <div class="album-info ml-0 md:ml-6 mt-6 md:mt-0 flex-1">
                <h2 class="text-2xl font-bold mb-4">{{ props.title }}</h2>
                <p class="text-gray-600 mb-2">Release Date: {{ new Date(props.releaseDate).toLocaleDateString() }}</p>
                <p class="text-gray-600 mb-4">Genre: {{ props.genre }}</p>
                <p class="text-gray-800 mb-4">{{ props.description }}</p>

                <!-- Tracklist -->
                <h3 class="text-lg font-bold mb-2">Tracks:</h3>
                <ul class="list-disc pl-5">
                    <li v-for="(track, index) in props.tracks" :key="index" class="text-gray-700">
                        {{ track }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.opened-book {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 1rem;
    overflow-y: auto;
}

.book-cover {
    width: 40%;
    /* Adjust size relative to space */
    height: auto;
    /* Maintain aspect ratio */
    margin-bottom: 1rem;
    /* Space between image and details */
}

.album-info {
    text-align: center;
    max-width: 80%;
}

.album-info h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.album-info p,
.album-info ul {
    font-size: 1rem;
    line-height: 1.5;
    color: #333;
}

@keyframes fade-in {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>
