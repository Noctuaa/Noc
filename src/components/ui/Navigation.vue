<script setup>
import { ref } from 'vue';
import { scrollTo } from '../../utils/ScrollManager';

// Navigation sections list
const sections = ref([
  { id: 'hero', label: 'Home' },
  { id: 'profile', label: 'Profil' },
  { id: 'competences', label: 'Compétences' },
  { id: 'portfolio', label: 'Porfolio' },
  { id: 'contact', label: 'Contact' },
]);

// Currently active section id
const activeSection = ref('hero');

/**
 * Smooth scroll to a specific section
 * Special handling for Profile section (scrolls to Hero height to trigger curtain effect)
 * @param {string} id - Section id to scroll to
 * @returns {void}
 */
const scrollToSection = (id) => {
  if (id === 'profile') {
    const heroHeight = document.querySelector('#hero')?.offsetHeight || window.innerHeight;
    scrollTo(heroHeight);
  } else {
    scrollTo(`#${id}`);
  }
  activeSection.value = id;
};
</script>

<template>
  <nav class="top-navigation">
    <ul class="nav-list d-flex jc-center gap-8">
      <li
        v-for="section in sections"
        :key="section.id"
        @click="scrollToSection(section.id)"
        :class="{ active: activeSection === section.id }"
        class="nav-item"
      >
        <a class="nav-link text-uppercase" :href="`#${section.id}`" @click.prevent>{{ section.label }}</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.top-navigation {
  position: fixed;
  top: 5%;
  left: 0;
  right: 0;
  z-index: 1000;
}

.nav-item {
  cursor: pointer;
  transition: transform var(--transition-fast) ease;
}

.nav-item:hover {
  transform: translateY(-2px);
}

.nav-link {
  color: var(--color-text-secondary);
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 2px;
  transition: all var(--transition-fast) ease;
}

.nav-item.active .nav-link,
.nav-item:hover .nav-link {
  color: var(--color-text-primary);
}
</style>
