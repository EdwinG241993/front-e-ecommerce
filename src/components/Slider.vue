<template>
    <div class="flex flex-col items-center">
        <div class="relative w-full max-w-md">
            <div class="relative w-full h-48">
                <template v-for="(productPhoto, index) in productPhotos" :key="index">
                    <transition name="fade">
                        <img :src="productPhoto" class="absolute inset-0 object-cover"
                            v-if="index === currentSliderIndex" />
                    </transition>
                </template>
                <button class="absolute top-1/2 right-2 z-10 bg-white text-gray-800 rounded-full hover:bg-gray-100"
                    @click="nextSlide"><svg class="h-4 w-4 text-zinc-500" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg></button>
                <button class="absolute top-1/2 left-2 z-10 bg-white text-gray-800 rounded-full hover:bg-gray-100"
                    @click="prevSlide"><svg class="h-4 w-4 text-zinc-500" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg></button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onUnmounted, defineProps } from 'vue';

// Define productId prop
const props = defineProps({
    productPhotos: {
        type: Array,
        required: true
    }
});

const currentSliderIndex = ref(0);
let intervalId;

const isTimerPaused = ref(false);

const nextSlide = () => {
    currentSliderIndex.value = (currentSliderIndex.value + 1) % props.productPhotos.length;
};

const prevSlide = () => {
    currentSliderIndex.value = (currentSliderIndex.value - 1 + props.productPhotos.length) % props.productPhotos.length;
};
</script>