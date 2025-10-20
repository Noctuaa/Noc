<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ProjectCard from './ProjectCard.vue';

const isStacked = ref(true); // Initial stacked state for cards entrance animation
const carousel = ref([]); // DOM references for carousel items
const featured = ref(2); // Currently featured card index (0-4)
const isOverlayVisible = ref(false); // Controls overlay content visibility
const isScaled = ref(false); // Controls 3D scale effect on featured card

// Portfolio projects configuration
const projects = [
  {
    id: 1,
    name: 'NocWeather',
    liveUrl: 'https://weather.nocdev.fr/',
    gitUrl: 'https://github.com/Noctuaa/weather-app',
    tech: ['Vue', 'API Weather', 'CSS'],
    description: 'Application météo.',
    img: '/weather.webp',
  },
  {
    id: 2,
    name: 'Todo',
    liveUrl: null,
    gitUrl: 'https://github.com/Noctuaa/Weather-App',
    tech: ['Vue', 'Hono', 'Redis', 'MySQL'],
    description: 'Todo avec Hono.',
    img: '/hono.webp',
  },
  {
    id: 3,
    name: 'NocImmo',
    liveUrl: 'https://nocimmo.nocdev.fr/',
    gitUrl: null,
    tech: ['Vue', 'Laravel', 'MySQL'],
    description: 'Plateforme immobilière.',
    img: '/chalets.webp',
  },
  {
    id: 4,
    name: 'NocTime',
    liveUrl: 'https://github.com/Noctuaa/clock-time',
    gitUrl: 'https://github.com/Noctuaa/clock-time',
    tech: ['JavaScript', 'CSS'],
    description: 'Horloge interactive.',
    img: 'time.webp',
  },
  {
    id: 5,
    name: 'Pomo',
    liveUrl: 'https://pomo.nocdev.fr/',
    gitUrl: null,
    tech: ['Vue', 'CSS'],
    description: 'Timer Pomodoro.',
    img: '/pomo.webp',
  },
];

let autoRotateTimer = null; // Auto-rotation timer reference

/**
 * Orchestrates smooth carousel rotation with sequential animations
 * Sequence: scale down - overlay out - rotation - scale up - overlay in
 * @async
 * @returns {Promise<void>}
 */
const rotateCarousel = async () => {
  // Phase 1 : Scale down preparation
  isScaled.value = false;
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Phase 2 : Overlay exit
  isOverlayVisible.value = false;
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Phase 3: Logical rotation
  featured.value = (featured.value + 1) % projects.length;
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Phase 4: Visual reconstruction
  isScaled.value = true;
  await new Promise((resolve) => setTimeout(resolve, 300));
  isOverlayVisible.value = true;
};

/**
 * Start automatic carousel rotation every 5 seconds
 */
const startAutoRotate = () => {
  autoRotateTimer = setInterval(rotateCarousel, 5000);
};

/**
 * Navigates directly to specific project (dots navigation)
 * @param {number} index - Target project index
 * @returns {Promise<void>}
 */
const goToSlide = async (index) => {
  isScaled.value = false;
  isOverlayVisible.value = false;
  await new Promise((resolve) => setTimeout(resolve, 600));

  featured.value = index;
  stopAutoRotate();
  startAutoRotate();

  await new Promise((resolve) => setTimeout(resolve, 600));
  isScaled.value = true;
  isOverlayVisible.value = true;
};

// Auto-rotation controls functions
const pauseAutoRotate = () => stopAutoRotate();
const resumeAutoRotate = () => startAutoRotate();

// Stops and cleans up auto-rotation timer
const stopAutoRotate = () => {
  if (autoRotateTimer) {
    clearInterval(autoRotateTimer);
    autoRotateTimer = null;
  }
};

// Initialize carousel with entrance animation
const initCarousel = () => {
  setTimeout(() => {
    isStacked.value = false;
    isScaled.value = true;
    isOverlayVisible.value = true;
    startAutoRotate();
  }, 1000);
};

// Cleanup timer on component unmount
onBeforeUnmount(() => {
  stopAutoRotate();
});

onMounted(() => {
  initCarousel();
});
</script>

<template>
  <div class="banner">
    <div class="slider d-flex jc-center p-relative" @mouseenter="pauseAutoRotate" @mouseleave="resumeAutoRotate">
      <ProjectCard
        v-for="(project, index) in projects"
        :key="project.id"
        :name="project.name"
        :link="project.link"
        :tech="project.tech"
        :description="project.description"
        :liveUrl="project.liveUrl"
        :gitUrl="project.gitUrl"
        :img="project.img"
        :class="[
          'carousel-item p-absolute',
          { stacked: isStacked },
          { featured: index === featured },
          { 'carousel-overlay': index === featured && isOverlayVisible },
          { 'item-scale': index === featured && isScaled },
        ]"
        :style="`--position: ${(index - featured + 2 + projects.length) % projects.length}`"
        :ref="(el) => (carousel[index] = el)"
      />
    </div>
    <div class="d-flex jc-center mt-5 gap-2">
      <button
        v-for="(project, index) in projects"
        :key="`dot-${index}`"
        :class="['dot rounded mt-16', { active: index === featured }]"
        @click="goToSlide(index)"
      ></button>
    </div>
  </div>
</template>

<style>
@import '../../assets/styles/components/carousel.css';
</style>
