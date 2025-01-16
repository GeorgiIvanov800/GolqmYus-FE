<script setup lang="ts">
import LoaderComponent from '@/components/LoaderComponent.vue';
import ArtistCard from './components/ArtistCard.vue';
import { onMounted, ref } from 'vue';
import type { Artist } from './types/Artist';
import { getAllArtists } from '@/services/artistAPI';
import { logger } from '@/utils/logger';
import { useLoaderStore } from '@/stores/loaderStore';

const loaderStore = useLoaderStore();
const artists = ref<Artist[]>();


onMounted(async () => {
    try {
        loaderStore.showLoader();
        artists.value = await getAllArtists();
        loaderStore.hideLoader();
    } catch (err) {
        loaderStore.hideLoader();
        logger.log(err);
    }
})

</script>

<template>

    <div class="flex flex-wrap gap-28 justify-center items-center max-h-full">
        <ArtistCard v-for="artist in artists" :key="artist.id" v-bind="artist" />
    </div>
</template>