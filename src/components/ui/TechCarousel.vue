<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
const technologies = [
  { id: 'html', name: 'HTML5', description: 'Structure sémantique et moderne des pages web.', logo: '/icons/html.svg' },
  { id: 'css', name: 'CSS3', description: 'Stylage avancé, Grid, Flexbox et animations.', logo: '/icons/css.svg' },
  { id: 'js', name: 'JavaScript', description: 'Développement web dynamique et interactif.', logo: '/icons/js.svg' },
  {
    id: 'vue',
    name: 'Vue.js',
    description: 'Framework progressif pour interfaces utilisateur.',
    logo: '/icons/vuejs.svg',
  },
  { id: 'pinia', name: 'Pinia', description: 'Store moderne pour gestion état Vue.js.', logo: '/icons/pinia.svg' },
  { id: 'astro', name: 'Astro', description: 'Framework web moderne et performant.', logo: '/icons/astrop.svg' },
  { id: 'gsap', name: 'GSAP', description: 'Animations web performantes et fluides.', logo: '/icons/gsap.svg' },
  { id: 'nodejs', name: 'Node.js', description: 'Runtime JavaScript côté serveur.', logo: '/icons/node.svg' },
  { id: 'ts', name: 'TypeScript', description: 'JavaScript typé pour projets robustes.', logo: '/icons/type.svg' },
  { id: 'hono', name: 'Hono', description: 'Framework web rapide et léger.', logo: '/icons/hono.svg' },
  { id: 'knex', name: 'Knex.js', description: 'Query builder SQL pour Node.js.', logo: '/icons/knex.svg' },
  { id: 'mysql', name: 'MySQL', description: 'Base de données relationnelle performante.', logo: '/icons/mysql.svg' },
  { id: 'redis', name: 'Redis', description: 'Cache en mémoire ultra-rapide.', logo: '/icons/redis.svg' },
  { id: 'linux', name: 'Linux', description: "Système d'exploitation open source.", logo: '/icons/linux.svg' },
  { id: 'git', name: 'Git', description: 'Versioning et collaboration de code source.', logo: '/icons/git.svg' },
  { id: 'vscode', name: 'VS Code', description: 'Éditeur de code extensible et moderne.', logo: '/icons/vscode.svg' },
  { id: 'insomnia', name: 'Insomnia', description: 'Client REST/GraphQL pour APIs.', logo: '/icons/insomnia.svg' },
  {
    id: 'inkscape',
    name: 'Inkscape',
    description: 'Création graphique vectorielle open source.',
    logo: '/icons/inkscape.svg',
  },
  { id: 'win', name: 'Windows', description: "Système d'exploitation Microsoft.", logo: '/icons/win.svg' },
  {
    id: 'arch',
    name: 'Arch Linux',
    description: 'Distribution Linux minimaliste et performante.',
    logo: '/icons/arch.svg',
  },
];

const modules = [Navigation, Autoplay];
</script>

<template>
  <Swiper
    :modules="modules"
    :breakpoints="{
      576: { slidesPerView: 1.5, spaceBetween: 10 }, // Mobile
      768: { slidesPerView: 2, spaceBetween: 10 }, // Tablet portrait
      992: { slidesPerView: 3, spaceBetween: 10 }, // Tablet landscape
      1200: { slidesPerView: 4, spaceBetween: 20 }, // Desktop
      1400: { slidesPerView: 5, spaceBetween: 10 }, // Large desktop
      1920: { slidesPerView: 6, spaceBetween: 35 },
      2560: { slidesPerView: 7.5, spaceBetween: 40 },
    }"
    :centered-slides="true"
    :loop="true"
    :navigation="false"
    :speed="500"
    :slide-to-clicked-slide="true"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }"
    class="tech-swiper"
  >
    <SwiperSlide v-for="tech in technologies" :key="tech.id">
      <div class="tech-card">
        <div class="tech-card-inner">
          <div class="tech-logo">
            <img :src="tech.logo" :alt="`${tech.name} logo`" />
          </div>
          <h3 class="tech-name">{{ tech.name }}</h3>
          <p class="tech-description">{{ tech.description }}</p>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>
/* Swiper container */
.tech-swiper {
  width: 100%;
  height: 350px;
  padding: 20px 60px;
  position: relative;
  z-index: 10; /* Flotte au-dessus du background Portfolio */
}

/* Tech cards - garde tous tes styles ! */
.tech-card {
  height: 100%;
  width: 100%;
  max-height: 300px;
  max-width: 350px;
  margin: 0 auto;
  opacity: 0.6;
  transform: scale(0.9);
  transition: all 0.3s ease;
  cursor: pointer;
}

.tech-card-inner {
  background: rgba(80, 79, 82, 0.15);
  height: 100%;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(96, 165, 250, 0.3);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-4);
  transition: all 0.3s ease;
  position: relative;
  z-index: 6;
}

.tech-card-inner::before {
  content: '';
  top: 0;
  position: absolute;
  z-index: -1;
  height: 101%;
  filter: grayscale(70%);
  width: 101%;
  border-radius: var(--border-radius-lg);
}

.tech-logo {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-2);
}

.tech-logo img {
  width: 100%;
  height: 100%;
}

.tech-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-primary-text);
  text-align: center;
  margin: 0;
}

.tech-description {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  text-align: center;
  line-height: 1.6;
  margin: 0;
}

/* Slide active */
:deep(.swiper-slide-active) .tech-card {
  filter: grayscale(0%);
  opacity: 1;
  transform: scale(1);
}

:deep(.swiper-slide-active) .tech-card-inner::before {
  border: 3px solid transparent;
  background: linear-gradient(#1a1f3a, #1a1f3a) padding-box, var(--gradient-border-neon) border-box;
  filter: grayscale(0%);
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.4), 0 0 20px rgba(96, 165, 250, 0.2);
}

/* Boutons navigation */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: var(--color-primary);
}
</style>
