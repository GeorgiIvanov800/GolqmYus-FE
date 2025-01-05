<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Album } from '../types/Album';

const props = defineProps<Album>();
const emit = defineEmits(['toggleZoom']);

const isOpen = ref(false);


//Methods
const toggleOpen = () => {
    isOpen.value = !isOpen.value;
    emit('toggleZoom', isOpen.value)
}

//Computed
const formatDate = computed(() => {
    return new Date(props.releaseDate).toLocaleDateString('bg-BG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
});

</script>

<template>
    <div class="album-book text-center" :class="{ 'zoomed': isOpen }" @click.stop="toggleOpen">
        <!-- Book Spine and Cover Wrapper -->
        <div class="book-wrapper relative inline-block">
            <!-- Book Spine -->
            <div
                class="spine absolute top-0 left-0 w-2 h-80 bg-gradient-to-r from-[#7f5539] to-[#9c6644] shadow-inner rounded-l-lg border-r border-gray-900 z-20">
            </div>

            <!-- Book Cover -->
            <div class="relative w-[15.8rem] h-[19.9rem] bg-gray-200 rounded-r-lg overflow-hidden shadow-lg ml-[0.4rem] z-10"
                :style="{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
                <!-- Optional overlay on hover -->
                <div class="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>
        </div>

        <!-- Album Name Below -->
        <h3 class="mt-4 text-lg font-bold text-white bg-black/70 inline-block px-2 py-1 rounded">
            {{ title }}
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
}

.album-book.zoomed::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
}

/* Spine Styling */
.spine {
    position: absolute;
    height: 20rem;
    /* Matches cover height */
    width: 1.8rem;
    /* Thinner spine */
    top: 0;
    /* Align to the top */
    left: 0;
    /* Align to the left */
    transform: rotateY(15deg);
    transform-origin: left center;
    background: #664c39;
    /* Leather effect */
    box-shadow: inset 2px 0 8px rgba(0, 0, 0, 0.4);
    border-right: 2px solid rgba(0, 0, 0, 0.2);
    z-index: 20;
    /* Ensures spine is above cover */
}

/* Cover Styling */
.book-wrapper .relative {
    position: relative;
    height: 19.9rem;
    /* Adjusted height */
    width: 15.8rem;
    /* Matches the width of the cover */
    top: 0;
    /* Align to the top */
    left: 0.4rem;
    /* Fine-tuned spacing between spine and cover */
    transform: rotateY(5deg);
    transform-origin: left center;
    box-shadow: -2px 4px 6px rgba(0, 0, 0, 0.4);
    z-index: 10;
    /* Ensures cover stays below spine */
}

/* Album Name */
.album-book h3 {
    margin-top: 1rem;
    /* Space between the book and the title */
    font-size: 1.125rem;
    /* Font size for album name */
    font-weight: 700;
    text-align: center;
    color: white;
    background: rgba(0, 0, 0, 0.7);
    /* Background for contrast */
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    /* Rounded edges */
    position: static;
    /* Natural block flow positioning */
}
</style>
