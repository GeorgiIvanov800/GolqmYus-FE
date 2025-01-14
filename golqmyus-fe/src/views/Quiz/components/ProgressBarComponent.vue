<script setup lang="ts">

const props = defineProps<{
    progress: number;
}>();
</script>

<template>
    <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: props.progress + '%' }"></div>
    </div>
</template>

<style scoped>
.progress-bar-container {
    width: 100%;
    height: 20px;
    background-color: #f3f4f6;
    border-radius: 10px;
}

.progress-bar {
    height: 100%;
    background-color: #34D398;
    border-radius: 10px;
}
</style>
