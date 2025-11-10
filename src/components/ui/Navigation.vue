<script setup>
import { ref, onMounted } from 'vue';
import { initCurtainEffect, initLenis, scrollTo } from '../../utils/ScrollManager';

const sections = ref([
  { id: 'hero', label: 'Home' },
  { id: 'profile', label: 'Profil' },
  { id: 'competences', label: 'Compétences' },
  { id: 'portfolio', label: 'Porfolio' },
  { id: 'contact', label: 'Contact' },
]);

const activeSection = ref('hero');

/* Function to smoothly scroll to a section */
const scrollToSection = (id) => {
  if (id === 'profile') {
    const heroHeight = document.querySelector('#hero')?.offsetHeight || window.innerHeight;
    scrollTo(heroHeight);
  } else {
    scrollTo(`#${id}`);
  }

  activeSection.value = id;
};

onMounted(() => {
  initCurtainEffect();
  initLenis();
});
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
