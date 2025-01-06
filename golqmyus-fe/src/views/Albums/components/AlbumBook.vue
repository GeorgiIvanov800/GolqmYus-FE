<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Album } from '../types/Album';

const props = defineProps<Album>();
const emit = defineEmits(['toggleZoom']);

const isZoomed = ref(false);
const isOpen = ref(false);

// Methods
const toggleZoom = () => {
    isZoomed.value = !isZoomed.value;

    // Add delay for opening animation after zoom-in
    if (isZoomed.value) {
        setTimeout(() => {
            isOpen.value = true;
        }, 300); // Delay matches the zoom-in transition
    } else {
        isOpen.value = false;
    }

    emit('toggleZoom', isZoomed.value, props);
};

// Computed
const formatDate = computed(() => {
    return new Date(props.releaseDate).toLocaleDateString('bg-BG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
});
</script>

<template>
    <div class="album-book text-center" :class="{ zoomed: isZoomed }" @click="toggleZoom">
        <!-- Book Spine and Cover Wrapper -->
        <div class="book-wrapper relative inline-block" :class="{ open: isOpen }">
            <!-- Book Spine -->
            <div
                class="spine absolute top-0 left-0 w-2 h-80 bg-gradient-to-r from-[#7f5539] to-[#9c6644] shadow-inner rounded-l-lg border-r border-gray-900 z-20">
            </div>

            <!-- Book Cover -->
            <div class="relative w-[15.8rem] h-[19.9rem] bg-gray-200 rounded-r-lg overflow-hidden shadow-lg ml-[0.4rem] z-10"
                :style="{ backgroundImage: `url(${props.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
                :class="{ open: isOpen }">
                <!-- Optional Hover Overlay -->
                <div class="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity"></div>

                <!-- Opened Book Content -->
                <div v-if="isOpen" class="opened-book-content">
                    <!-- Left Page -->
                    <div class="page left-page">
                        <h2 class="text-xl font-bold">Left Page Content</h2>
                        <p>This is placeholder content for the left page of the book.</p>
                    </div>

                    <!-- Right Page -->
                    <div class="page right-page">
                        <h2 class="text-xl font-bold">Right Page Content</h2>
                        <p>This is placeholder content for the right page of the book.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Album Name Below -->
        <h3 class="mt-4 text-lg font-bold text-white bg-black/70 inline-block px-2 py-1 rounded">
            {{ props.title }}
        </h3>
    </div>
</template>


<style scoped>
.album-book {
    cursor: pointer;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    transition: transform 0.5s ease, box-shadow 0.5s ease;
    position: relative;
    z-index: 1;
}

.album-book.zoomed {
    transform: scale(1.5) translate(-50%, -50%);
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 50;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
}

/* Book Wrapper */
.book-wrapper {
    position: relative;
    transition: transform 0.5s ease-in-out;
    transform-style: preserve-3d;
    perspective: 1000px;
}

.book-wrapper.open {
    transform: rotateY(-180deg);
    /* Single flip */
}

/* Book Spine Styling */
.spine {
    position: absolute;
    height: 20rem;
    width: 1.8rem;
    top: 0;
    left: 0;
    transform: rotateY(15deg);
    transform-origin: left center;
    background: #664c39;
    box-shadow: inset 2px 0 8px rgba(0, 0, 0, 0.4);
    border-right: 2px solid rgba(0, 0, 0, 0.2);
    z-index: 20;
}

/* Book Cover Styling */
.book-wrapper .relative {
    position: relative;
    height: 19.9rem;
    width: 15.8rem;
    top: 0;
    left: 0.4rem;
    transform: rotateY(0deg);
    /* Default state */
    transform-origin: left center;
    box-shadow: -2px 4px 6px rgba(0, 0, 0, 0.4);
    z-index: 10;
}

.book-wrapper .relative.open {
    transform: rotateY(-180deg);
    /* Open the book */
    transition: transform 0.8s ease-in-out;
    background-color: rgba(255, 255, 255, 0.95);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    overflow: hidden;
    z-index: 10;
}

/* Opened Book Content */
.opened-book-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 2rem;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
    transform-style: preserve-3d;
}

/* Left and Right Pages */
.page {
    flex: 1;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    margin: 0 0.5rem;
    overflow-y: auto;
    text-align: center;
}

.left-page {
    border-right: 2px solid #ddd;
}

.right-page {
    border-left: 2px solid #ddd;
}

.opened-book-content h2 {
    font-size: 1.25rem;
    color: #333;
    margin-bottom: 0.5rem;
}

.opened-book-content p {
    font-size: 1rem;
    color: #666;
}
</style>
