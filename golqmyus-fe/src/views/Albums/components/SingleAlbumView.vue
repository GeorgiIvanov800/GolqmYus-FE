<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Button, Panel } from 'primevue';
import { computed, onMounted, ref } from 'vue';
import type { Track } from '../types/Track';
import type { Album } from '../types/Album';
import LyricsView from './LyricsView.vue';
import { fetchAlbumAndTracks } from '@/services/albumService';
import { logger } from '@/utils/logger';
import { useLoaderStore } from '@/stores/loaderStore';

const loaderStore = useLoaderStore();
const tracks = ref<Track[]>();
const album = ref<Album>();
const route = useRoute();
const albumId = Number(route.params.id);
const showLyrics = ref(false);
const selectedLyrics = ref<string>('');

onMounted(async () => {
    try {
        loaderStore.showLoader();
        const data = await fetchAlbumAndTracks(albumId);
        album.value = data.album;
        tracks.value = data.tracks;
        loaderStore.hideLoader();
    } catch (error) {
        logger.log(error);
    }
})

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
                    <Button v-if="track.fullLyricsText" @click="toggleLyrics(track.title)" icon="pi pi-align-justify"
                        label="Текст" />
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
:deep(.p-scrollpanel-bar.p-scrollpanel-bar-y) {
    background-color: #ffffff !important;
    /* Force the background color to white */
}

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