<script setup>
import { scrollTo } from '../../utils/ScrollManager';

const props = defineProps({
  target: {
    type: String,
    required: true,
  },
});

/**
 * Smooth scroll to section
 * @returns {void}
 */
const handleClick = () => {
  scrollTo(props.target);
};
</script>

<template>
  <button class="btn btn-gradient profile-card-button" @click="handleClick">
    <slot></slot>
  </button>
</template>
