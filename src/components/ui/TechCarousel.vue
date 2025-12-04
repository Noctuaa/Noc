<script setup>
import { ref, computed } from 'vue';

// Active index for the carousel
const activeIndex = ref(0);

/**
 * List of technologies with their details.
 */
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

/**
 * Navigate to previous card in the carousel
 * Loops back to last card if at the beginning
 */
const goToPrev = () => {
  if (activeIndex.value > 0) {
    activeIndex.value--;
  } else {
    activeIndex.value = technologies.length - 1;
  }
};

/**
 * Navigate to next card in the carousel
 * Loops back to first card if at the end
 */
const goToNext = () => {
  if (activeIndex.value < technologies.length - 1) {
    activeIndex.value++;
  } else {
    activeIndex.value = 0;
  }
};

/**
 * Navigate to specific card by index
 * @param {number} index - Target card index
 */
const goToIndex = (index) => {
  activeIndex.value = index;
};

/**
 * Calculate relative position of a card compared to the active card
 * with infinite loop effect (wrapping).
 *
 * @param {number} cardIndex - Index of the card we're looking at (0 to 19)
 * @param {number} activeIndex - Index of the currently active card (0 to 19)
 * @param {number} total - Total number of cards (20 in our case)
 * @returns {number} Relative position (-10 to +10)
 *
 * @example
 * // If we're on HTML (0) and looking at Arch (19)
 * getRelativePosition(19, 0, 20) // returns -1 (Arch is on the left)
 *
 * @example
 * // If we're on Arch (19) and looking at HTML (0)
 * getRelativePosition(0, 19, 20) // returns 1 (HTML is on the right)
 */
const getRelativePosition = (cardIndex) => {
  let diff = cardIndex - activeIndex.value; // Calculate raw difference

  const total = technologies.length;

  if (diff > total / 2) {
    diff = diff - total; // Too far right → wrap around from the left
  } else if (diff < -total / 2) {
    diff = diff + total; // Too far left → wrap around from the right
  }

  return diff;
};

/**
 * Computed property that returns all technology cards with calculated positions.
 * Positions are clamped between -2 and +2 for performance optimization.
 *
 * @returns {Array<Object>} Array of card objects with additional properties:
 *   - {number} index - Original index in technologies array
 *   - {number} relativePos - Clamped position relative to active card (-2 to +2)
 *   - {boolean} isActive - True if this card is currently active (relativePos === 0)
 *   - {boolean} isHidden - True if card should be hidden (|relativePos| > 1)
 *
 * @example
 * // When activeIndex = 0 (HTML), a card at position 10 will be clamped:
 * // relativePos would be 10 → clamped to 2 (stacked with other hidden right cards)
 */
const cardsWithPositions = computed(() => {
  return technologies.map((tech, index) => {
    const relativePos = getRelativePosition(index);

    // Clamp position between -2 and +2 (limit to 5 unique positions for performance)
    // Math.min(2, relativePos) → caps maximum at +2 (right stack)
    // Math.max(-2, ...) → caps minimum at -2 (left stack)
    const clampedPos = Math.max(-2, Math.min(2, relativePos));

    return {
      ...tech,
      index,
      relativePos: clampedPos,
      isActive: relativePos === 0,
      isHidden: Math.abs(relativePos) > 1,
    };
  });
});
</script>
<template>
  <div class="carousel-track ow-hidden d-flex">
    <!-- Loop through all technologies -->
    <div
      v-for="card in cardsWithPositions"
      :key="card.id"
      class="tech-card"
      :class="{
        'tech-card-active': card.isActive,
        'tech-card-hidden': card.isHidden,
      }"
      :style="`transform: translateX(${card.relativePos * 304}px)`"
      @click="goToIndex(card.index)"
    >
      <div class="tech-card-inner">
        <!-- Logo -->
        <div class="tech-logo">
          <img :src="card.logo" :alt="`${card.name} logo`" />
        </div>

        <!-- Tech name -->
        <h3 class="tech-name">{{ card.name }}</h3>

        <!-- Description -->
        <p class="tech-description">{{ card.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* === Layout carousel === */
.carousel-track {
  display: flex;
  align-items: center;
  padding: var(--spacing-8) 0;
  position: relative;
  width: 100%;
  height: 400px;
  justify-content: center;
}

/* === Cartes technos - Style de base === */
.tech-card {
  width: 280px;
  position: absolute;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  filter: grayscale(70%);
  opacity: 0.5;
  transform: scale(0.85);
  z-index: 5;
}

/* Inner card avec glassmorphism (inspiré du template) */
.tech-card-inner {
  background: linear-gradient(135deg, rgba(96, 165, 250, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(96, 165, 250, 0.3);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-8);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-4);
  min-height: 280px;
  transition: all 0.3s ease;
}

/* Logo */
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

/* Nom techno */
.tech-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-primary-text);
  text-align: center;
  margin: 0;
}

/* Description */
.tech-description {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  text-align: center;
  line-height: 1.6;
  margin: 0;
}

/* === ÉTATS DES CARTES === */

/* État ACTIVE : carte centrale colorée avec glow */
.tech-card-active {
  filter: grayscale(0%);
  opacity: 1;
  transform: scale(1);
  z-index: 10;
}

.tech-card-active .tech-card-inner {
  background: linear-gradient(135deg, rgba(96, 165, 250, 0.25) 0%, rgba(168, 85, 247, 0.25) 100%);
  border-color: var(--color-primary);
  box-shadow: 0 0 10px rgba(96, 165, 250, 0.5), 0 0 20px rgba(168, 85, 247, 0.3);
}

/* État HIDDEN : cartes éloignées (cachées) */
.tech-card-hidden {
  filter: grayscale(100%);
  opacity: 0;
  transform: scale(0.7);
  pointer-events: none; /* Pas cliquable */
  z-index: 1;
}
</style>
