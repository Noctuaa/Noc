<script setup lang="ts">
import { ref, onUnmounted } from 'vue';

defineOptions({ inheritAttrs: false });

// Modal visibility state - controls display and scroll locking
const showModal = ref(false);

// title - Modal title displayed in header
defineProps<{ title: string }>();

// Opens modal and stops page scrolling (Lenis)
const openModal = () => {
  showModal.value = true;
  (window as any).lenis?.stop();
  document.body.style.overflow = 'hidden';
};

/**
 * Closes modal and restores page scrolling (Lenis)
 */
const closeModal = () => {
  showModal.value = false;
  (window as any).lenis?.start();
  document.body.style.overflow = '';
};

onUnmounted(closeModal);
</script>

<template>
  <a href="#" @click.prevent="openModal" class="legal-link">{{ title }}</a>
  <transition name="fade">
    <Teleport to="body">
      <div v-if="showModal" @click.prevent="closeModal" class="modal-overlay p-fixed z-100 d-flex ai-center jc-center">
        <div class="modal-wrapper p-relative" @click.stop>
          <button
            @click.prevent="closeModal"
            class="modal-close p-absolute z-1 d-flex ai-center jc-center cursor-p"
            aria-label="Fermer"
          >
            ✕
          </button>
          <div class="modal-card neon-mask p-relative">
            <div class="modal-header">
              <h3 class="modal-title">{{ title }}</h3>
            </div>
            <div class="modal-content" data-lenis-prevent>
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </transition>
</template>

<style src="../styles/components/modal.css"></style>
