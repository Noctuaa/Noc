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
    .replace(/\s+/g, '-'); // Spaces to dashes
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
        <div class="profile-window linux-window rounded-lg p-relative" @click.stop>
          <div class="linux-bar">
            <span class="linux-title">{{ linuxPath }}</span>
            <div class="linux-controls">
              <span>▲</span>
              <span>▼</span>
              <span @click.prevent="closeModal" class="linux-close">✕</span>
            </div>
          </div>
          <div class="modal-content">
            <slot></slot>
          </div>
        </div>
      </div>
    </Teleport>
  </transition>
</template>
