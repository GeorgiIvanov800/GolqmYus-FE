<script setup lang="ts">
import { ref } from 'vue';
import Carousel from 'primevue/carousel';

interface Picture {
    src: string,
    alt: string,
}

interface ResponsiveOption {
    breakpoint: string,
    numVisible: number,
    numScroll: number,
}

const pictures = ref<Picture[]>([
    { src: new URL('@/assets/images/pic1.jpg', import.meta.url).href, alt: 'Picture 1' },
    { src: new URL('@/assets/images/pic2.jpg', import.meta.url).href, alt: 'Picture 2' },
    { src: new URL('@/assets/images/pic3.jpg', import.meta.url).href, alt: 'Picture 3' },
    { src: new URL('@/assets/images/pic4.jpg', import.meta.url).href, alt: 'Picture 4' },
    { src: new URL('@/assets/images/pic5.jpg', import.meta.url).href, alt: 'Picture 5' },
    { src: new URL('@/assets/images/pic6.jpg', import.meta.url).href, alt: 'Picture 6' },
    { src: new URL('@/assets/images/pic7.jpg', import.meta.url).href, alt: 'Picture 7' },
]);

const responsiveOptions = ref<ResponsiveOption[]>([
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]);
</script>

<template>

    <div class="card flex justify-center">
        <Carousel :value="pictures" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions" circular
            :autoplayInterval="3000">
            <template #item="slotProps">
                <div class="border border-surface-200 dark:border-surface-700 rounded m-1 p-2 bg-gray-200 shadow-md">
                    <div class="w-full h-full flex items-center justify-center">
                        <img :src="slotProps.data.src" :alt="slotProps.data.alt" class="w-full rounded" />
                    </div>
                </div>
            </template>
        </Carousel>
    </div>
</template>
