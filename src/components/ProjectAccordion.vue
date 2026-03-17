<script setup>
import { ref } from 'vue';

// Currently opened project index in accordion
const activeIndex = ref(0);

// Portfolio projects list
const projects = [
  {
    id: 1,
    title: 'SkyCast',
    titleShort: 'P1',
    link: 'https://weather.nocdev.fr/',
    tags: ['Vue.js', 'API Weather', 'Responsive'],
    description: 'Application météo temps réel avec API de géolocalisation et design responsive.',
    image: '/weather.webp',
  },
  {
    id: 3,
    title: 'EstateHub',
    titleShort: 'P2', // ← Change P3 en P2
    link: 'https://nocimmo.nocdev.fr/',
    tags: ['Vue.js', 'Laravel', 'MySQL'],
    description: 'Plateforme immobilière full-stack avec système de recherche avancée et gestion des annonces.',
    image: '/chalets.webp',
  },
];

/**
 * Opens a project in the accordion
 * @param {number} index - Project index to open
 */
const openProject = (index) => {
  activeIndex.value = index;
};
</script>

<template>
  <div class="accordion">
    <div
      v-for="(project, index) in projects"
      :key="project.id"
      :class="['project-item neon-mask', { active: activeIndex === index }]"
      @click="openProject(index)"
    >
      <img :src="project.image" :alt="project.title" class="project-img" />
      <h3 class="title-vertical">{{ project.title }}</h3>
      <div class="project-content">
        <h3 class="project-title">{{ project.title }}</h3>
        <p class="project-description">{{ project.description }}</p>
        <div class="project-tags">
          <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
        </div>
        <a :href="project.link" class="btn btn-outline" target="_blank" @click.stop>Voir le projet</a>
      </div>
    </div>
  </div>
</template>
