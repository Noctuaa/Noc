<script setup>
   import { ref } from 'vue';
   import SplineKeyboard from '../ui/SplineKeyboard.vue';

   const hoveredKey = ref(null); // Tooltip state

	const keyToTech = {
		'html': { name: 'HTML5', description: 'Structure sémantique et moderne des pages web.', icon: 'html' },
		'css': { name: 'CSS3', description: 'Stylage avancé, Grid, Flexbox et animations.', icon: 'css' },
		'js': { name: 'JavaScript', description: 'Développement web dynamique et interactif.', icon: 'js' },
		'vue': { name: 'Vue.js', description: 'Framework progressif pour interfaces utilisateur.', icon: 'vuejs' },
		'pinia': { name: 'Pinia', description: 'Store moderne pour gestion état Vue.js.', icon: 'pinia' },
		'astro': { name: 'Astro', description: 'Framework web moderne et performant.', icon: 'astrop' },
		'gsap': { name: 'GSAP', description: 'Animations web performantes et fluides.', icon: 'gsap' },
		'nodejs': { name: 'Node.js', description: 'Runtime JavaScript côté serveur.', icon: 'node' },
		'ts': { name: 'TypeScript', description: 'JavaScript typé pour projets robustes.', icon: 'type' },
		'hono': { name: 'Hono', description: 'Framework web rapide et léger.', icon: 'hono' },
		'knex': { name: 'Knex.js', description: 'Query builder SQL pour Node.js.', icon: 'knex' },
		'mysql': { name: 'MySQL', description: 'Base de données relationnelle performante.', icon: 'mysql' },
		'redis': { name: 'Redis', description: 'Cache en mémoire ultra-rapide.', icon: 'redis' },
		'linux': { name: 'Linux', description: 'Système d\'exploitation open source.', icon: 'linux' },
		'git': { name: 'Git', description: 'Versioning et collaboration de code source.', icon: 'git' },
		'vscode': { name: 'VS Code', description: 'Éditeur de code extensible et moderne.', icon: 'vscode' },
		'insomnia': { name: 'Insomnia', description: 'Client REST/GraphQL pour APIs.', icon: 'insomnia' },
		'inkscape': { name: 'Inkscape', description: 'Création graphique vectorielle open source.', icon: 'inkscape' },
		'win': { name: 'Windows', description: 'Système d\'exploitation Microsoft.', icon: 'win' },
		'arch': { name: 'Arch Linux', description: 'Distribution Linux minimaliste et performante.', icon: 'arch' }
	}


   const handleKeyHover = (keyName) => {
      hoveredKey.value = keyToTech[keyName] || null;
      console.log('Key hovered:', hoveredKey.value);
   }

</script>


<template>
	<section id="competences" class="section container p-relative">
		<div class="section-header">
			<h2>Compétences</h2>
			<div class="divider"><hr></div>
			<p class="section-description">Survolez le clavier pour découvrir mes technologies et expertises.</p>
    	</div>
		<div class="competence-layout d-flex jc-center p-relative">
			<div class="holo-panel d-flex pi-center">
				<transition name="tooltip-content" mode="out-in">
					<div v-if="hoveredKey?.name" :key="hoveredKey.name" class="d-flex tooltip-content fd-column gap-3">
						<img v-if="hoveredKey?.icon" :src="`/icons/${hoveredKey?.icon}.svg`" :alt="`Logo ${hoveredKey?.name}`" class="tech-icon w-100">
						<h3 class="text-center">{{ hoveredKey?.name }}</h3>
						<p class="text-center">{{ hoveredKey?.description }}</p>
					</div>
				</transition>
			</div>
			<SplineKeyboard client:load @key-hover="handleKeyHover"/>
		</div>

   </section>
</template>
