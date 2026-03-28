<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { throttle } from '../utils/ScrollManager.ts';

// Navigation sections list
const sections = [
  { id: 'hero', label: 'Accueil' },
  { id: 'profile', label: 'À propos' },
  { id: 'competences', label: 'Compétences' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
];

const activeSection = ref('');
const isMenuOpen = ref(false);
const hideNav = ref(false);
const isScrolled = ref(false);

type ScrollEvent = {
  scroll: number;
  direction: number;
};

let sectionObserver: IntersectionObserver | null = null;

/** Updates nav hide/show based on scroll direction */
const updateNavVisibility = (scroll: number, direction: number) => {
  isScrolled.value = scroll > 100;
  if (direction === 1 && scroll > 100) hideNav.value = true;
  else if (direction === -1) hideNav.value = false;
};

/** Throttled scroll handler — updates nav visibility at most every 100ms */
const handleScrollThrottled = throttle(({ scroll, direction }: ScrollEvent) => {
  updateNavVisibility(scroll, direction);
}, 100);

/** Toggles mobile menu — stops/starts Lenis scroll accordingly */
const setMenuMobile = (open = !isMenuOpen.value) => {
  isMenuOpen.value = open;
  open ? (window as any).lenis?.stop() : (window as any).lenis?.start();
};

/** Observes section intersections to update active nav link */
const createSectionObserver = () =>
  new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeSection.value = entry.target.id;
      });
    },
    { rootMargin: '-40% 0px -80% 0px', threshold: 0 },
  );

// Register scroll listener and observe all sections
onMounted(() => {
  const init = () => (window as any).lenis.on('scroll', handleScrollThrottled);

  if ((window as any).lenis) init();
  else window.addEventListener('lenis:ready', init, { once: true });

  sectionObserver = createSectionObserver();
  sections.forEach(({ id }) => {
    const el = document.querySelector(`#${id}`);
    if (el) sectionObserver!.observe(el);
  });
});

// Clean up listeners and observer to prevent memory leaks
onUnmounted(() => {
  (window as any).lenis?.off('scroll', handleScrollThrottled);
  sectionObserver?.disconnect();
});
</script>

<template>
  <nav :class="['nav', { 'is-open': isMenuOpen, hidden: hideNav, scrolled: isScrolled }, 'fixed z-100 w-full']">
    <div class="container h-full">
      <div class="nav-inner flex ai-center w-full h-full">
        <ul class="nav-list flex ai-center gap-5">
          <li
            v-for="section in sections"
            :key="section.id"
            @click="setMenuMobile(false)"
            :class="['nav-item cursor-p', { active: activeSection === section.id }]"
          >
            <a
              :href="`#${section.id}`"
              class="nav-link flex p-2 text-sm fw-semibold tracking-wide uppercase c-secondary"
            >
              {{ section.label }}
            </a>
          </li>
        </ul>
        <button @click="setMenuMobile()" class="nav-burger" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </nav>
</template>
