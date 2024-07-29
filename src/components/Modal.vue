<template>
    <div v-if="show" @mouseenter="showCart" @mouseleave="hideCart"
        class="fixed top-[40px] right-[10px] z-50 flex bg-white shadow-lg p-4 rounded-md">
        <slot></slot>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['close']);

const close = () => {
    emit('close');
};
</script>
