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

const activeSection = ref('hero');
const isMenuOpen = ref(false);
const hideNav = ref(false);
const isScrolled = ref(false);

type ScrollEvent = {
  scroll: number;
  direction: number;
};

/** Updates nav hide/show based on scroll direction */
const updateNavVisibility = (scroll: number, direction: number) => {
  if (direction === 1 && scroll > 100) hideNav.value = true;
  else {
    isScrolled.value = scroll > 200;
    hideNav.value = false;
  }
};

/** Updates active nav link based on current scroll position */
const updateActiveSection = (scroll: number) => {
  const offset = scroll + window.innerHeight * 0.4;
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.getElementById(sections[i].id);
    if (el && el.offsetTop <= offset) {
      activeSection.value = sections[i].id;
      break;
    }
  }
};

/** Throttled scroll handler — updates nav visibility at most every 100ms */
const handleScrollThrottled = throttle(({ scroll, direction }: ScrollEvent) => {
  updateNavVisibility(scroll, direction);
  updateActiveSection(scroll);
}, 100);

/** Toggles mobile menu — stops/starts Lenis scroll accordingly */
const setMenuMobile = (open = !isMenuOpen.value) => {
  isMenuOpen.value = open;
  open ? (window as any).lenis?.stop() : (window as any).lenis?.start();
};

// Register scroll listener and observe all sections
onMounted(() => {
  const init = () => {
    (window as any).lenis.on('scroll', handleScrollThrottled);
    updateActiveSection((window as any).lenis.scroll ?? window.scrollY);
  };

  if ((window as any).lenis) init();
  else window.addEventListener('lenis:ready', init, { once: true });
});

// Clean up listeners and observer to prevent memory leaks
onUnmounted(() => {
  (window as any).lenis?.off('scroll', handleScrollThrottled);
});
</script>

<template>
  <nav :class="['nav', { 'is-open': isMenuOpen, hidden: hideNav, scrolled: isScrolled }, 'fixed z-100 w-full']">
    <div class="container h-full">
      <div class="nav-inner flex ai-center jc-between w-full h-full">
        <img src="/logo.svg" alt="Nocdev logo" class="nav-logo" width="70" height="70" />

        <ul class="nav-list flex ai-center gap-5">
          <li
            v-for="section in sections"
            :key="section.id"
            @click="setMenuMobile(false)"
            :class="['nav-item cursor-p', { active: activeSection === section.id }]"
          >
            <a :href="`#${section.id}`" class="nav-link flex p-2">
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
