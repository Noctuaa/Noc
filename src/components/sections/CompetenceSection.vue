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
	<section id="competences" class="section container">
		<div class="section-header">
			<h2>Compétences</h2>
			<div class="divider"><hr></div>
			<p class="section-description">Survolez le clavier pour découvrir mes technologies et expertises.</p>
    	</div>
		<div class="competence-layout d-flex jc-center">
			<div class="holo-panel d-flex pi-center">
				<transition name="tooltip-content" mode="out-in">
					<div v-if="hoveredKey?.name" :key="hoveredKey.name" class="d-flex tooltip-content fd-column gap-3">
						<img v-if="hoveredKey?.icon" :src="`/icons/${hoveredKey?.icon}.svg`" alt="" srcset="" class="tech-icon">
						<h3 class="text-center">{{ hoveredKey?.name }}</h3>
						<p>{{ hoveredKey?.description }}</p>
					</div>
				</transition>
			</div>
			<SplineKeyboard client:load @key-hover="handleKeyHover"/>
		</div>

   </section>
</template>


<style>

  .tooltip-content-enter-active,
  .tooltip-content-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .tooltip-content-enter-from {
    opacity: 0;
    transform: translateY(10px);
  }

  .tooltip-content-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }

  .tooltip-content-enter-to,
  .tooltip-content-leave-from {
    opacity: 1;
    transform: translateY(0);
  }


   #competences{
		color: white;
      position: relative ;
		grid-template-columns: 1fr 1fr;
      padding-top: 100px;
      min-height: 70vh;
   }

	#competences .section-description{
		width: 0;
   	max-width: 50ch;
	}
	.competence-layout{
		position: relative;
		margin-top: 50px;
	}

   .tooltip-content h3, .tooltip-content p {
      color: white;
      text-align: center;
      z-index: 2;
      position: relative;
      margin: 0;
   }

   .tech-icon {
      width: 100%;
      height: 40px;
      object-fit: contain;
   }

     .holo-panel {
      position: relative;
      width: 270px;
      height: 270px;
      margin-left: 60px;  /* Décalage droite */
    	margin-top: 40px;   /* Décalage bas */

      padding: 40px 20px;
      clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
      z-index: 10;
      isolation: isolate;


    /* Hologramme effect */
   /*background: rgb(27,60,120);*/
    background: linear-gradient(135deg,
      rgb(27,60,120),    /* Bleu */
      rgb(22,80,115),    /* Vert */
      rgb(71,60,161)     /* Violet */
    );
    backdrop-filter: blur(10px);

    /* Glitch artefacts */
   box-shadow:
      0 0 20px rgba(124, 58, 237, 0.5),
      0 0 40px rgba(30, 58, 138, 0.5),
      inset 0 0 20px rgba(5, 150, 105, 0.1);

    /* Animation glitch */
    animation: hologram-glitch 2s infinite ease-in-out;
  }

  @keyframes hologram-glitch {
    0%, 95%, 100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(1.5px) translateY(0.5px);
    }
    50% {
      transform: translateX(-1px) translateY(-0.5px);
    }
    75% {
      transform: translateX(0.5px);
    }
  }




   .holo-panel::before {
    content: '';
    position: absolute;
    width: 255px;
    height: 255px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;

    /* Même clip-path octogone mais plus grand pour la bordure */
    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);

    /* Gradient pour la bordure */
    background: linear-gradient(135deg,
      rgb(27,60,120), 
      rgb(94, 39, 110)   /* Bleu */
    );
  }


  /* Lignes de scan */
  .holo-panel::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
	 width: 100%;
    height: 4px;
    background: linear-gradient(90deg, transparent, rgba(26, 31, 58, 0.486), transparent);
    animation: scan-line 2s infinite;
  }

  @keyframes scan-line {
    0% { top: 0; }
    100% { top: calc(100% - 2px); }
  }



</style>