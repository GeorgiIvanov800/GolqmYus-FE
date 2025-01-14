<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Button } from 'primevue';
import { onMounted, ref } from 'vue';
import type { Track } from '../types/Track';
import apiClient from '@/config/axios';
import type { Album } from '../types/Album';
import LyricsView from './LyricsView.vue';


const tracks = ref<Track[]>();
const album = ref<Album>();

const route = useRoute();
const albumId = Number(route.params.id);

onMounted(() => {
    fetchAlbumAndTracks();
})

const fetchAlbumAndTracks = async () => {
    try {
        const [albumResponse, tracksResponse] = await Promise.all([
            apiClient.get(`/albums/${albumId}`),
            apiClient.get(`/albums/${albumId}/tracks`)
        ]);
        album.value = albumResponse.data;
        tracks.value = tracksResponse.data;
        console.log(tracks.value);
    } catch (error) {
        console.error('Error fetching album or tracks:', error);
    }
}

const showLyrics = ref(false);
const selectedLyrics = ref<string>('');



function toggleLyrics(trackTitle: string) {
    const track = tracks.value?.find(t => t.title === trackTitle);

    if (selectedLyrics.value === track?.fullLyricsText && showLyrics.value) {
        showLyrics.value = false;
        selectedLyrics.value = '';
    } else {
        showLyrics.value = true;
        selectedLyrics.value = track?.fullLyricsText || "";
    }
}

function closeLyrics() {
    showLyrics.value = false;
    selectedLyrics.value = '';
}

</script>
<template>
    <div
        class="flex flex-col lg:flex-row items-center justify-start gap-12 px-8 py-16 bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg">
        <div class="album-cover w-64 h-64 lg:w-72 lg:h-72 flex-shrink-0">
            <img :src="album?.imageUrl" alt="Album Cover" class="w-full h-full rounded-lg shadow-lg object-cover" />
        </div>

        <div class="tracklist flex flex-col items-center lg:items-start">
            <div class="mb-6 text-center lg:text-left">
                <h1 class="text-4xl font-bold text-white">{{ album?.title }}</h1>
                <p class="text-gray-400 mt-2 text-lg">Издаден: {{ album?.releaseDate }}</p>
            </div>


            <ul class="space-y-4 w-full">
                <li v-for="(track, index) in tracks" :key="track.id"
                    class="bg-gray-800 text-white rounded-lg px-4 py-2 shadow-md hover:bg-gray-700 cursor-pointer flex items-center justify-between">
                    <span>{{ (index + 1) + '. ' + track.title + ' ' + `(${track.duration})` }}</span>
                    <Button @click="toggleLyrics(track.title)" icon="pi pi-align-justify" label="Текст" />
                </li>
            </ul>
        </div>
    </div>

    <transition name="fade-slide">
        <div v-if="showLyrics">
            <LyricsView :lyrics="selectedLyrics" @close="closeLyrics" />
        </div>
    </transition>
</template>


<style scoped>
.lyrics-container {
    height: auto;

}

@media (min-width: 1024px) {
    .lyrics-container {
        height: 26.8em;

    }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateX(20px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(20px);
}
</style>