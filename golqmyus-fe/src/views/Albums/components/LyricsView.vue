<script setup lang="ts">
import { ScrollPanel, Button } from 'primevue';

defineProps<{
    lyrics?: string
}>();

defineEmits(['close']);

</script>

<template>
    <div class="lyrics-container relative bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full lg:w-3/4 mx-auto">
        <Button icon="pi pi-times" severity="danger" rounded aria-label="Close" @click="$emit('close')"
            class="absolute top-4 right-4" />
        <h2 class="text-2xl font-bold mb-4 text-center">Текст</h2>
        <ScrollPanel style="width: 100%; height: 300px;" class="lyrics-scroll-panel">
            <p v-if="lyrics" class="text-lg leading-relaxed whitespace-pre-wrap">
                {{ lyrics }}
            </p>
            <p v-else class="text-gray-400">No lyrics available for this track.</p>
        </ScrollPanel>
    </div>
</template>

<style scoped>
.lyrics-scroll-panel {
    padding: 16px;
    background-color: #202833;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

}


.lyrics-container {
    border: 1px solid rgba(255, 255, 255, 0.1);
}

::deep(.p-scrollpanel-bar.p-scrollpanel-bar-y) {
    background-color: white !important;
}
</style>