<script setup lang="ts">
import { Card, Button } from 'primevue';
import { ref } from 'vue';
import type { Artist } from '../types/Artist';

const isLoading = ref<Boolean>(true);

const props = defineProps<Artist>();

</script>

<template>
    <Card style="width: 20rem; overflow: hidden"
        class="bg-gray-800 text-white rounded-lg border border-gray-700 shadow-lg">
        <template #header>
            <img alt="user header" :src="pictureUrl" />
        </template>
        <template #title>{{ `${firstName} ${lastName}` }}</template>
        <template #subtitle>{{ nickname }}</template>

        <template #footer>
            <div class="flex gap-4 mt-1">
                <Button label="Cancel" severity="secondary" outlined class="w-full" />
                <Button label="Save" class="w-full" />
            </div>
        </template>
    </Card>
</template>