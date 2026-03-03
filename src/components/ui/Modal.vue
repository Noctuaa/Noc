<script setup>
import { ref } from 'vue';

defineOptions({ inheritAttrs: false });

/** Modal visibility state */
const showModal = ref(false);

/**
 * @property {string} title - Modal title displayed in header
 */
defineProps({
  title: {
    type: String,
    required: true,
  },
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
  <a href="#" @click.prevent="openModal" class="legal-link">{{ title }}</a>
  <transition name="fade">
    <Teleport to="body">
      <div v-if="showModal" @click.prevent="closeModal" class="modal-overlay d-flex ai-center jc-center p-fixed">
        <div class="modal-wrapper" @click.stop>
          <button @click.prevent="closeModal" class="modal-close" aria-label="Fermer">✕</button>
          <div class="modal-card neon-mask">
            <div class="modal-header">
              <h3 class="modal-title">{{ title }}</h3>
            </div>
            <div class="modal-content">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </transition>
</template>

<style src="../../assets/styles/components/modal.css"></style>
