<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { scrollTo, throttle } from '../../utils/ScrollManager';

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
const lastScrollY = ref(0); // Last scroll position for direction detection
const isScrolling = ref(false); // Flag to prevent scroll spy flicker during programmatic scroll

/**
 * Update navigation visibility and scroll state based on scroll direction
 * Hides nav when scrolling down (past 100px), shows when scrolling up
 * @returns {void}
 */
const updateNavState = () => {
  const currentScrollY = window.scrollY;
  isScrolled.value = currentScrollY > 50;

  if (currentScrollY > lastScrollY.value && currentScrollY > 100) {
    // Scrolling down
    hideNav.value = true;
  } else if (currentScrollY < lastScrollY.value) {
    // Scrolling up
    hideNav.value = false;
  }
  lastScrollY.value = currentScrollY;
};

/**
 * Detect and update the active section based on scroll position
 * Special handling for top of page (Hero) and bottom of page (Contact)
 * Skips detection during programmatic scrolling (isScrolling flag)
 * @returns {void}
 */
const detectActiveSection = () => {
  if (isScrolling.value) return;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrolledToBottom = window.scrollY + windowHeight >= documentHeight - 50; // 50px margin
  const scrolledToTop = window.scrollY <= 100; // Near top of page

  // Special case: if at top of page, activate first section (Hero)
  if (scrolledToTop) {
    activeSection.value = sections[0].id; // 'hero'
    return; // Exit early, no need to check other sections
  }

  sections.forEach((section, index) => {
    const element = document.querySelector(`#${section.id}`);
    if (element) {
      const rect = element.getBoundingClientRect();
      const isLastSection = index === sections.length - 1;

      // Last section: activate if scrolled to bottom OR normal condition
      if (isLastSection && scrolledToBottom) {
        activeSection.value = section.id;
      }
      // Normal case: section active if top is near viewport top and bottom is visible
      else if (rect.top <= 200 && rect.bottom >= 200) {
        activeSection.value = section.id;
      }
    }
  });
};

/**
 * Handle scroll events by updating navigation state and detecting active section
 * This function is throttled to max 10 executions/second for performance
 * @returns {void}
 */
const handleScroll = () => {
  updateNavState();
  detectActiveSection();
};

// Throttled version of handleScroll: limits execution to max 10 times/second (100ms)
const handleScrollThrottled = throttle(handleScroll, 100);

/**
 * Toggle the .nav-burger menu open/close state
 * @returns {void}
 */
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  isMenuOpen.value ? window.lenis.stop() : window.lenis.start();
};

/**
 * Close the .nav-burger menu
 * @returns {void}
 */
const closeMenu = () => {
  if (window.lenis) {
    window.lenis.start();
  }
  isMenuOpen.value = false;
};

/**
 * Smooth scroll to a specific section
 * Special handling for Profile section (scrolls to Hero height to trigger curtain effect)
 * @param {string} id - Section id to scroll to
 * @returns {void}
 */
const navigateToSection = (id) => {
  if (isMenuOpen.value) {
    closeMenu();
  }
  if (window.lenis) {
    window.lenis.start();
  }

  isScrolling.value = true;
  activeSection.value = id;

  if (id === 'profile') {
    const heroHeight = document.querySelector('#hero')?.offsetHeight || window.innerHeight;
    scrollTo(heroHeight);
  } else {
    scrollTo(`#${id}`);
  }
  setTimeout(() => {
    isScrolling.value = false;
  }, 1000);
};

// Attach scroll listener on mount
onMounted(() => {
  if (window.lenis) {
    window.lenis.on('scroll', handleScrollThrottled);
  }
});

// Remove scroll listener on unmount (cleanup)
onUnmounted(() => {
  if (window.lenis) {
    window.lenis.off('scroll', handleScrollThrottled);
  }
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
            @click.prevent="navigateToSection(section.id)"
            :class="['nav-item cursor-p', { active: activeSection === section.id }]"
          >
            <a :href="`#${section.id}`" class="nav-link d-flex">{{ section.label }}</a>
          </li>
        </ul>
        <button @click="toggleMenu" class="nav-burger" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </nav>
</template>
