<script setup lang="ts">
import { mockAlbums } from '@/mock/albums';
import { ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();
const album = mockAlbums.find((a) => a.id === route.params.id);

if (!album) {
    throw new Error('Album not found!');
}

// Reactive state to track visibility of lyrics for each track
const lyricsVisible = ref<boolean[]>([]);

// Toggle lyrics visibility for a track
function toggleLyrics(index: number) {
    // Initialize the array if not set
    if (!lyricsVisible.value[index]) {
        lyricsVisible.value[index] = false;
    }
    lyricsVisible.value[index] = !lyricsVisible.value[index];
}

// Mock function to get lyrics (replace with actual data later)
function getLyrics(index: number): string {
    const mockLyrics = [
        "Lyrics for Track 1 go here...",
        "Lyrics for Track 2 go here...",
        "Lyrics for Track 3 go here...",
    ];
    return mockLyrics[index] || "No lyrics available.";
}
</script>
<template>
    <div
        class="single-album-view-container flex flex-col lg:flex-row items-center justify-center gap-12 px-8 py-16 bg-gradient-to-b from-gray-900 to-black">
        <!-- Album Cover -->
        <div class="album-cover w-64 h-64 lg:w-72 lg:h-72 flex-shrink-0">
            <img :src="album.imageUrl" alt="Album Cover" class="w-full h-full rounded-lg shadow-lg object-cover" />
        </div>

        <!-- Album Info and Tracklist -->
        <div class="tracklist flex flex-col items-center lg:items-start">
            <!-- Album Title and Release Date -->
            <div class="mb-6 text-center lg:text-left">
                <h1 class="text-4xl font-bold text-white">{{ album.title }}</h1>
                <p class="text-gray-400 mt-2 text-lg">Released: {{ album.releaseDate }}</p>
            </div>

            <!-- Tracklist -->
            <ul class="space-y-4 w-full">
                <li v-for="(track, index) in album.tracks" :key="index"
                    class="bg-gray-800 text-white rounded-lg px-4 py-2 shadow-md hover:bg-gray-700 cursor-pointer flex flex-col items-start">
                    <div class="flex justify-between w-full items-center">
                        <span>{{ track }}</span>
                        <button @click="toggleLyrics(index)"
                            class="bg-blue-500 text-white px-2 py-1 rounded shadow hover:bg-blue-600 text-sm">
                            Show Lyrics
                        </button>
                    </div>
                    <!-- Lyrics Display -->
                    <p v-if="lyricsVisible[index]" class="mt-2 text-gray-400 text-sm">
                        {{ getLyrics(index) }}
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>


<style scoped>
.single-album-view-container {
    background-color: #1a1a1a;
    border-radius: 8px;
}
</style>