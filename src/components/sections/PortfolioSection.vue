<script setup>
import PortfolioCarousel from '../carousel/PortfolioCarousel.vue';
</script>

<template>
  <section id="portfolio" class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Portfolio</h2>
        <div class="divider"><hr /></div>
        <p class="section-description">Découvrez mes projets et réalisations techniques.</p>
      </div>
      <div class="portfolio-wrapper d-flex ai-center jc-center">
        <PortfolioCarousel client:visible />
      </div>
    </div>
  </section>
</template>

<style scoped>
.portfolio-wrapper {
  min-height: 60vh;
}
</style>
