<script setup>
   import { ref, onMounted } from 'vue';

   const sections = ref([
      { id: 'hero', label: 'Home' },
      { id: 'profil', label: 'Profil' },
      { id: 'portfolio', label: 'Porfolio' },
      { id: 'contact', label: 'Contact' }
   ]);

   const activeSection = ref('hero');

   const scrollToSection = (id) => {
      const section = document.getElementById(id);
      if (section) {
         section.scrollIntoView({ behavior: 'smooth', block: 'center' });
         activeSection.value = id;
      }
   }

   const handleScroll = () => {
      const scrollY = window.scrollY + 250; // Offset for better section detection

      sections.value.forEach((section) => {
         const element = document.getElementById(section.id);
         if (element) {
            const { offsetTop, offsetHeight } = element;

            if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
               activeSection.value = section.id;
            }
         }
      })
   }

   onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      handleScroll()
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