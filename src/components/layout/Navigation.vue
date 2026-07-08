<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { throttle } from '../../utils/ScrollManager.ts';

// Navigation sections list
const sections = [
  { id: 'hero', label: 'Accueil' },
  { id: 'profile', label: 'À propos' },
  { id: 'competences', label: 'Compétences' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'methods', label: 'Methods' },
  { id: 'contact', label: 'Contact' },
];

const activeSection = ref('hero');
const isMenuOpen = ref(false);
const hideNav = ref(false);

type ScrollEvent = {
  scroll: number;
  direction: number;
};

/** Updates nav hide/show based on scroll direction */
const updateNavVisibility = (scroll: number, direction: number) => {
  if (direction === 1 && scroll > 100) hideNav.value = true;
  else {
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
  <nav
    :class="['nav text-sm font-medium ink-2', { 'is-open': isMenuOpen, hidden: hideNav }, ' flex z-100']"
    aria-label="Main navigation"
  >
    <ul class="nav-list flex ai-center gap-4">
      <li
        v-for="section in sections"
        :key="section.id"
        @click="setMenuMobile(false)"
        :class="['nav-item py-2 px-3 c-pointer', { active: activeSection === section.id }]"
      >
        <a :href="`#${section.id}`" class="">{{ section.label }}</a>
      </li>
    </ul>
    <button @click="setMenuMobile()" class="nav-toggle" aria-label="Toggle menu">
      <svg
        data-dc-tpl="41"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="#eaf0ff"
        stroke-width="2"
        stroke-linecap="round"
        data-om-id="83ebca2c:45"
      >
        <line data-dc-tpl="42" x1="4" y1="7" x2="20" y2="7" data-om-id="83ebca2c:46"></line>
        <line data-dc-tpl="43" x1="4" y1="12" x2="20" y2="12" data-om-id="83ebca2c:47"></line>
        <line data-dc-tpl="44" x1="4" y1="17" x2="20" y2="17" data-om-id="83ebca2c:48"></line>
      </svg>
    </button>
  </nav>
</template>
