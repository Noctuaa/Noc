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
      :class="['project-item', { active: activeIndex === index }]"
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
        <a :href="project.link || project.git" class="view-button" target="_blank" @click.stop>
          {{ project.link ? 'View Live' : 'View on GitHub' }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ========================================
  PORTFOLIO ACCORDION
  Horizontal expandable project showcase
  ======================================== */

.accordion {
  height: 520px;
}

/* ========================================
  PROJECT ITEMS - Base state (collapsed)
  ======================================== */

.project-item {
  position: relative;
  flex: 1;
  overflow: hidden;
  transition: flex var(--transition-normal) cubic-bezier(0.25, 1, 0.5, 1);
  background: var(--gradient-bg-2); /* Ton gradient sombre */
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: flex-end;
  cursor: pointer;
}

/* Hover effect (léger) */
.project-item:hover {
  background: var(--gradient-bg-1);
}

/* Active state (expanded) */
.project-item.active {
  flex: 6; /* Prend 6x plus de place */
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.4), 0 0 20px rgba(96, 165, 250, 0.2);
}

.project-item.active::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--border-radius-lg);
  padding: 3px;
  background: var(--gradient-border-neon);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  z-index: 10;
}

/* ========================================
  PROJECT IMAGE - Background
  ======================================== */

.project-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.2; /* Très transparent par défaut */
  transition: all var(--transition-normal) ease;
  transform: scale(1.2);
}

.project-item.active .project-img {
  opacity: 0.5; /* Un peu plus visible quand ouvert */
  transform: scale(1.05);
}

/* ========================================
  VERTICAL TITLE - Visible when collapsed
  ======================================== */

.title-vertical {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);
  white-space: nowrap;
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 1px;
  opacity: 1;
  transition: opacity var(--transition-normal) ease;
  text-transform: uppercase;
  color: rgba(96, 165, 250, 0.7);
}

.project-item.active .title-vertical {
  opacity: 0; /* Disparaît quand ouvert */
}

/* ========================================
  PROJECT CONTENT - Visible when expanded
  ======================================== */

.project-content {
  padding: 1.5rem;
  width: 100%;
  z-index: 2;
  opacity: 0;
  transform: translateY(20px);
  transition: all var(--transition-normal) ease;
  transition-delay: 0.1s;
  backdrop-filter: blur(var(--blur-glass));
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  pointer-events: none;
}

.project-item.active .project-content {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.project-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--color-primary-text);
}

.project-description {
  font-size: 0.85rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  color: var(--text-secondary);
}

/* ========================================
  PROJECT TAGS - Technologies
  ======================================== */

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 1rem;
}

.project-tags span {
  font-size: 0.7rem;
  padding: 4px 10px;
  background: rgba(96, 165, 250, 0.1); /* Bleu transparent */
  border: 1px solid rgba(96, 165, 250, 0.3);
  border-radius: 20px;
  color: var(--color-primary-text);
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

/* Animation staggered des tags */
.project-item.active .project-tags span {
  opacity: 1;
  transform: translateY(0);
}

.project-tags span:nth-child(1) {
  transition-delay: 0.1s;
}
.project-tags span:nth-child(2) {
  transition-delay: 0.15s;
}
.project-tags span:nth-child(3) {
  transition-delay: 0.2s;
}
.project-tags span:nth-child(4) {
  transition-delay: 0.25s;
}

/* ========================================
  VIEW BUTTON
  ======================================== */

.view-button {
  display: inline-block;
  margin-top: 1.2rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 8px 16px;
  background-color: transparent;
  border: 1px solid var(--color-primary-text);
  color: var(--color-primary-text);
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.view-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: var(--gradient-border-neon); /* Ton gradient néon */
  transition: all 0.3s ease;
  z-index: -1;
}

.view-button:hover {
  color: var(--bg-darkest);
  border-color: transparent;
}

.view-button:hover::before {
  left: 0;
}

/* ========================================
  RESPONSIVE - MOBILE
  ======================================== */

@media (max-width: 768px) {
  .accordion {
    flex-direction: column;
    height: auto;
  }

  .project-item {
    height: 80px;
    align-items: center;
    justify-content: center;
  }

  .project-item.active {
    height: 300px;
    flex: 1;
  }

  .title-vertical {
    transform: translate(-50%, -50%) rotate(0); /* Pas de rotation sur
  mobile */
  }

  .project-content {
    padding: 1rem;
  }

  .project-title {
    font-size: 1.2rem;
  }

  .project-description {
    font-size: 0.8rem;
  }
}
</style>
