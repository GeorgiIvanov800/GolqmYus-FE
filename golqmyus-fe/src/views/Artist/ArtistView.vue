<script setup lang="ts">
import LoaderComponent from '@/components/LoaderComponent.vue';
import ArtistCard from './components/ArtistCard.vue';
import { onMounted, ref } from 'vue';
import type { Artist } from './types/Artist';
import { getAllArtists } from '@/services/artistAPI';
import { logger } from '@/utils/logger';


const artists = ref<Artist[]>();
const isLoading = ref<Boolean>(true);

onMounted(async () => {
    try {
        isLoading.value = true;
        artists.value = await getAllArtists();
        console.log(artists.value);
    } catch (err) {
        logger.log(err);
    } finally {
        isLoading.value = false;
    }
})

</script>

<template>

    <div class="flex flex-wrap gap-6 justify-center items-center max-h-full">
        <LoaderComponent v-if="isLoading" />

        <ArtistCard v-for="artist in artists" :key="artist.id" v-bind="artist" />
    </div>


</template>