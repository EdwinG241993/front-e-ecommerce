<template>
    <div v-if="show" @mouseenter="showCart" @mouseleave="hideCart">
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
