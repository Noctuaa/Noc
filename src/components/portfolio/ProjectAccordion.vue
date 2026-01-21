<script setup>
import { ref } from 'vue';

const activeIndex = ref(0);

// Portfolio projects configuration
const projects = [
  {
    id: 1,
    title: 'NocWeather',
    titleShort: 'P1',
    link: 'https://weather.nocdev.fr/',
    git: 'https://github.com/Noctuaa/weather-app',
    tags: ['Vue', 'API Weather', 'CSS'],
    description: 'Application météo.',
    image: '/weather.webp',
  },
  {
    id: 2,
    title: 'Todo',
    titleShort: 'P2',
    link: null,
    git: 'https://github.com/Noctuaa/Weather-App',
    tags: ['Vue', 'Hono', 'Redis', 'MySQL'],
    description: 'Todo avec Hono.',
    image: '/hono.webp',
  },
  {
    id: 3,
    title: 'NocImmo',
    titleShort: 'P3',
    link: 'https://nocimmo.nocdev.fr/',
    git: null,
    tags: ['Vue', 'Laravel', 'MySQL'],
    description: 'Plateforme immobilière.',
    image: '/chalets.webp',
  },
  {
    id: 4,
    title: 'NocTime',
    titleShort: 'P4',
    link: 'https://github.com/Noctuaa/clock-time',
    git: 'https://github.com/Noctuaa/clock-time',
    tags: ['JavaScript', 'CSS'],
    description: 'Horloge interactive.',
    image: '/time.webp',
  },
  {
    id: 5,
    title: 'Pomo',
    titleShort: 'P5',
    link: 'https://pomo.nocdev.fr/',
    git: null,
    tags: ['Vue', 'CSS'],
    description: 'Timer Pomodoro.',
    image: '/pomo.webp',
  },
];

const openProject = (index) => {
  activeIndex.value = index;
};
</script>

<template>
  <div class="accordion d-flex w-100 gap-2">
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
        <a :href="project.link || project.git" class="btn btn-outline" target="_blank" @click.stop>
          {{ project.link ? 'Voir le site' : 'Voir sur GitHub' }}
        </a>
      </div>
    </div>
  </div>
</template>
