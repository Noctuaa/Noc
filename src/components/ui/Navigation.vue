<script setup>
   import { ref, onMounted } from 'vue';
   import { gsap } from 'gsap';
   import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
   import { ScrollSmoother } from 'gsap/ScrollSmoother';
   import { ScrollTrigger } from 'gsap/ScrollTrigger';
   gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

   let smoother = null;

   const sections = ref([
      { id: 'hero', label: 'Home' },
      { id: 'profile', label: 'Profil' },
      { id: 'competences', label: 'Compétences' },
      { id: 'portfolio', label: 'Porfolio' },
      { id: 'contact', label: 'Contact' }
   ]);

   const activeSection = ref('hero');

   /* Function to smoothly scroll to a section */
   const scrollToSection = (id) => {
      smoother.scrollTo(`#${id}`, true, "top top");
      activeSection.value = id;
   }

  onMounted(() => {
    smoother = ScrollSmoother.create({
      el: "#smooth-content",
      smooth: 2,
      effects: true,
      smoothTouch: 0.1,
      ignore: ".spline-container"
    });
  })


</script>


<template>
   <nav class="top-navigation">
      <ul class="nav-list d-flex jc-center gap-8">
         <li v-for="section in sections" :key="section.id" @click="scrollToSection(section.id)"
            :class="{active: activeSection === section.id}" class="nav-item"> 
            <a class="nav-link text-uppercase" :href="`#${section.id}`" @click.prevent>{{ section.label }}</a>
         </li>
      </ul>
   </nav>
</template>


<style scoped>
   .top-navigation {
      position: fixed;
      top: 5%;
      left: 0;
      right: 0;
      z-index: 1000;
   }

   .nav-item {
      cursor: pointer;
      transition: transform var(--transition-fast) ease;
   }

   .nav-item:hover {
      transform: translateY(-2px)
   }

   .nav-link {
      color: var(--color-text-secondary);
      font-weight: 600;
      font-size: 14px;
      letter-spacing: 2px;
      transition: all var(--transition-fast) ease;
   }

   .nav-item.active .nav-link, .nav-item:hover .nav-link{
     color: var(--color-text-primary);
  }
</style>