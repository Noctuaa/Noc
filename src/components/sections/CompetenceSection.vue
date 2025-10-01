<script setup>
   import { ref } from 'vue';
   import SplineKeyboard from '../ui/SplineKeyboard.vue';

   const hoveredKey = ref(null); // Tooltip state

   const keyToTech = {
      'html' : { name: 'HTML5', description: 'Langage de struture web' },
      'css' : { name: 'CSS3', description: 'Stylage et mise en forme'},
      'js' : { name: 'JavaScript', description: '#F7DF1E'},
      'vue' : { name: 'Vue.js', description: '#4FC08D'},
      'pinia' : { name: 'Pinia', description: '#E9A820'},
      'astro' : { name: 'Astro', description: '#FF5F00'},
      'gsap' : { name: 'GSAP', description: '#38B'},
      'nodejs' : { name: 'Node.js', description: '#339933'},
      'ts': { name: 'TypeScript', description: '#3178C6'},
      'hono' : { name: 'Hono', description: '#000'},
      'knex' : { name: 'Knex.js', description: '#000'},
      'mysql' : { name: 'MySQL', description: '#4479A1'},
      'redis' : { name: 'Redis', description: '#DC382D'},
      'linux' : { name: 'Linux', description: '#FCC624'},
      'git' : { name: 'Git', description: '#F05032'},
      'vscode' : { name: 'VS Code', description: '#007ACC'},
      'insomnia' : { name: 'Insomnia', description: '#000'},
      'inkscape' : { name: 'Inkscape', description: '#000'},
      'win' : { name: 'Windows', description: '#0078D6'},
      'arch' : { name: 'Arch Linux', description: '#1793D1'},
   }

   const handleKeyHover = (keyName) => {
      hoveredKey.value = keyToTech[keyName] || null;
      console.log('Key hovered:', hoveredKey.value);
   }

</script>


<template>
   <section id="competences" class="section">
      <h2>Compétences</h2>
<!-- Tooltip -->
      <div class="tooltip">
        <h3 class="text-center">{{ hoveredKey?.name }}</h3>
        <p>{{ hoveredKey?.description }}</p>
      </div>

      <SplineKeyboard client:load @key-hover="handleKeyHover"/>
   </section>
</template>


<style>
   #competences{
      position: relative ;
      padding-top: 100px;
      min-height: 70vh;
   }

   .tooltip h3, .tooltip p {
      color: white;
      text-align: center;
      z-index: 2;
      position: relative;
   }

     .tooltip {
      position: relative;
      width: 200px;
      height: 200px;
      margin: 30px auto; /* Centre horizontalement */
      padding: 40px 20px;
      clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
      transform: scale(1.3);
      z-index: 10;
      isolation: isolate;


    /* Hologramme effect */
   background: rgb(30, 58, 138);
    backdrop-filter: blur(10px);

    /* Glitch artefacts */
   box-shadow:
      0 0 20px rgba(124, 58, 237, 0.5),
      0 0 40px rgba(30, 58, 138, 0.5),
      inset 0 0 20px rgba(5, 150, 105, 0.1);

    /* Animation glitch */
    animation: hologram-glitch 2s infinite;
  }

  @keyframes hologram-glitch {
    0%, 100% {
      opacity: 0.8;
    }
    25% {
      opacity: 1;
      transform: scale(1.3) translateX(2px);
    }
    50% {
      opacity: 0.9;
      transform: scale(1.3) translateX(-1px);
    }
  }

   .tooltip::before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    z-index: -1;
    transform: scale(.93);

    /* Même clip-path octogone mais plus grand pour la bordure */
    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);

    /* Gradient pour la bordure */
    background: linear-gradient(135deg,
      rgba(30, 59, 138, 0.425),    /* Bleu */
      rgba(5, 150, 104, 0.26),    /* Vert */
      rgb(124, 58, 237)     /* Violet */
    );
  }


  /* Lignes de scan */
  .tooltip::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, cyan, transparent);
    animation: scan-line 1s infinite;
  }

  @keyframes scan-line {
    0% { top: 0; }
    100% { top: calc(100% - 2px); }
  }

  section {
    padding: 80px 0;
  }

</style>