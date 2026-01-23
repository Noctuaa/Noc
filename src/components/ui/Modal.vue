<script setup>
import { computed, ref } from 'vue';

defineOptions({ inheritAttrs: false });

/** Modal visibility state */
const showModal = ref(false);

/**
 * @property {string} title - Modal title (used for link text and linux path)
 */
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

/**
 * Generates Linux-style path from title
 * Example: "Mentions légales" → "> noctua/mentions-legales.md"
 */
const linuxPath = computed(() => {
  const slug = props.title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/\s+/g, '-') // Spaces to dashes
    .replace('politique-de-', '');
  return `> noctua/${slug}.md`;
});

/**
 * Opens modal and stops page scrolling (Lenis)
 */
const openModal = () => {
  showModal.value = true;
  if (window.lenis) window.lenis.stop();
};

/**
 * Closes modal and restores page scrolling (Lenis)
 */
const closeModal = () => {
  showModal.value = false;
  if (window.lenis) window.lenis.start();
};
</script>

<template>
  <a href="#" @click.prevent="openModal" class="legal-link">{{ props.title }}</a>
  <transition name="fade">
    <Teleport to="body">
      <div v-if="showModal" @click.prevent="closeModal" class="modal-overlay d-flex ai-center jc-center p-fixed">
        <div class="linux-window neon-mask" @click.stop>
          <div class="linux-bar">
            <span class="linux-title">{{ linuxPath }}</span>
            <button @click.prevent="closeModal" class="linux-close">✕</button>
          </div>
          <div class="modal-content">
            <slot></slot>
          </div>
        </div>
      </div>
    </Teleport>
  </transition>
</template>

<style src="../../assets/styles/components/modal.css"></style>
