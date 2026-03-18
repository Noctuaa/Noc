<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { throttle, DURATION } from '../utils/ScrollManager.ts';

// Navigation sections list
const sections = [
  { id: 'hero', label: 'Accueil' },
  { id: 'profile', label: 'À propos' },
  { id: 'competences', label: 'Compétences' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
];

const activeSection = ref('hero'); // Currently active section id
const isMenuOpen = ref(false); // Hamburger menu state
const isScrolled = ref(false); // Scroll state for potential future use
const hideNav = ref(false); // Hide Navigation on scroll down
const isScrolling = ref(false); // Flag to prevent scroll spy flicker during programmatic scroll

// Lenis scroll event shape
type ScrollEvent = {
  scroll: number;
  direction: number;
};

/**
 * Handle scroll events: updates nav visibility and detects active section
 * Uses Lenis scroll and direction values — called via handleScrollThrottled
 * @returns
 */
const handleScroll = ({ scroll, direction }: ScrollEvent) => {
  if (isScrolling.value) return;

  // Nav visibility
  isScrolled.value = scroll > 100 && direction !== 1;
  hideNav.value = direction === 1 && scroll > 100;

  // Edge cases - early returns
  if (scroll <= 100) {
    activeSection.value = sections[0].id;
    return;
  }

  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scroll + windowHeight >= documentHeight - 50) {
    activeSection.value = sections[sections.length - 1].id;
    return;
  }

  const active = sections.find((section) => {
    const el = document.querySelector(`#${section.id}`);
    if (!el) return false;
    const { top, bottom } = el.getBoundingClientRect();
    return top <= 200 && bottom >= 200;
  });

  if (active) activeSection.value = active.id;
};

// Throttled version of handleScroll: limits execution to max 10 times/second (100ms)
const handleScrollThrottled = throttle(handleScroll, 100);

/**
 * Toggle or set the mobile menu open/close state
 * Stops or starts Lenis scroll accordingly
 * @param open - Menu state (default: toggles current state)
 */
const setMenu = (open = !isMenuOpen.value) => {
  isMenuOpen.value = open;
  open ? (window as any).lenis?.stop() : (window as any).lenis?.start();
};

/**
 * Handles nav link click: closes mobile menu and locks scroll spy during programmatic scroll
 * @param id - Target section id
 */
const handleNavClick = (id: string) => {
  if (isMenuOpen.value) setMenu(false);

  isScrolling.value = true;
  activeSection.value = id;

  setTimeout(() => {
    isScrolling.value = false;
  }, DURATION * 1000);
};

// Attach scroll listener on mount
onMounted(() => {
  (window as any).lenis.on('scroll', handleScrollThrottled);
});

// Remove scroll listener on unmount (cleanup)
onUnmounted(() => {
  (window as any).lenis.off('scroll', handleScrollThrottled);
});
</script>

<template>
  <nav :class="['nav', { 'is-open': isMenuOpen, scrolled: isScrolled, hidden: hideNav }, 'p-fixed z-100 w-100']">
    <div class="container h-100">
      <div class="nav-inner d-flex ai-center w-100 h-100">
        <ul class="nav-list d-flex ai-center gap-3">
          <li
            v-for="section in sections"
            :key="section.id"
            @click="handleNavClick(section.id)"
            :class="['nav-item cursor-p', { active: activeSection === section.id }]"
          >
            <a :href="`#${section.id}`" class="nav-link d-flex">{{ section.label }}</a>
          </li>
        </ul>
        <button @click="setMenu()" class="nav-burger" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </nav>
</template>
