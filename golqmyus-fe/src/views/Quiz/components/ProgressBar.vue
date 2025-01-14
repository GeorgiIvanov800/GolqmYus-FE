<script setup lang="ts">


const props = defineProps({
    current: Number,
    total: Number,
});



</script>

<template>
    <div class="progress-indicator">
        <span class="text-lg">
            Question {{ current }} of {{ total }}
        </span>
        <!-- Optionally, you can add a progress bar -->
        <div class="mt-2 w-full bg-gray-200 rounded-full">
            <div class="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                :style="{ width: (current / total) * 100 + '%' }"></div>
        </div>
    </div>
</template>

<style scoped>
.progress-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.progress-bar {
    width: 100%;
    height: 10px;
    background-color: #e5e7eb;
    border-radius: 9999px;
}

.progress-bar-inner {
    height: 100%;
    background-color: #4f83cc;
    border-radius: 9999px;
}
</style>