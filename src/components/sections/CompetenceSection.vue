<script setup>
   import SplineKeyboard from '../ui/SplineKeyboard.vue';
</script>


<template>
   <section id="competences" class="section">
      <h2>Compétences</h2>
      <SplineKeyboard client:load />
   </section>
</template>


<style scoped>
   #competences{
      height: 100vh;
   }
</style>