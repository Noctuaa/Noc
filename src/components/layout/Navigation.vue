<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { throttle } from '../../utils/ScrollManager.ts';

// Navigation sections list
const sections = [
  { id: 'hero', label: 'Accueil' },
  { id: 'profile', label: 'À propos' },
  { id: 'competences', label: 'Compétences' },
  { id: 'projects', label: 'Projets' },
  { id: 'contact', label: 'Contact' },
];

const activeSection = ref('');
const isMenuOpen = ref(false);

type ScrollEvent = {
  scroll: number;
  direction: number;
};

/** Toggles the mobile menu — stops/starts Lenis scroll accordingly */
const toggleMenu = (open = !isMenuOpen.value) => {
  isMenuOpen.value = open;
  open ? (window as any).lenis?.stop() : (window as any).lenis?.start();
};

/** Updates active nav link based on current scroll position */
const updateActiveSection = (scroll: number) => {
  const offset = scroll + window.innerHeight * 0.4;
  let current = '';
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.getElementById(sections[i].id);
    if (el && el.offsetTop <= offset) {
      current = sections[i].id;
      break;
    }
  }
  activeSection.value = current;
};

/** Throttled scroll handler — updates active section at most every 100ms */
const handleScrollThrottled = throttle(({ scroll }: ScrollEvent) => {
  updateActiveSection(scroll);
}, 100);

// Register scroll listener and observe all sections
onMounted(() => {
  const init = () => {
    (window as any).lenis.on('scroll', handleScrollThrottled);
    updateActiveSection((window as any).lenis.scroll ?? window.scrollY);
  };

  if ((window as any).lenis) init();
  else window.addEventListener('lenis:ready', init, { once: true });
});

// Clean up listeners to prevent memory leaks
onUnmounted(() => {
  (window as any).lenis?.off('scroll', handleScrollThrottled);
});
</script>

<template>
  <div class="content">
    <button
      @click="toggleMenu()"
      class="nav-toggle relative flex-center z-999 c-pointer"
      aria-label="Toggle menu"
      :aria-expanded="isMenuOpen"
    >
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
    <nav
      :class="[
        'nav fixed z-100 flex-center flex-col h-svh text-base font-medium ink-1 inset-0 pe-none',
        { 'is-open': isMenuOpen },
      ]"
      aria-label="Main navigation"
    >
      <ul class="nav-list flex flex-col gap-3 text-center">
        <li
          v-for="section in sections"
          :key="section.id"
          @click="toggleMenu(false)"
          :class="['nav-item py-2 px-3 opacity-0 c-pointer', { active: activeSection === section.id }]"
        >
          <a :href="`/#${section.id}`" class="">{{ section.label }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
