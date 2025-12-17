<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Autoplay } from 'swiper/modules';
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
    class="tech-swiper p-relative"
  >
    <SwiperSlide v-for="tech in technologies" :key="tech.id">
      <div class="tech-card w-100 h-100 m-auto cursor-p">
        <div class="tech-card-inner p-relative d-flex fd-column ai-center jc-center h-100 gap-4 p-8">
          <div class="tech-logo">
            <img class="w-100 h-100" :src="tech.logo" :alt="`${tech.name} logo`" />
          </div>
          <h3 class="tech-name m-0 tt-center">{{ tech.name }}</h3>
          <p class="tech-description m-0 tt-center">{{ tech.description }}</p>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>
@import url('../../assets/styles/components/carousel.css');
</style>
