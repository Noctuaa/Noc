<script setup>
   import { gsap } from 'gsap';

   const handleScrollToCompetences = () => {
      gsap.to(window, {
         duration: 1.5,
         scrollTo: '#competences',
         ease: "power2.out"
    });

   }

</script>


<template>
   <section id="profile" class="section">
      <div class="container">
         <div class="section-header">
            <h2>Profil</h2>
            <div class="divider"><hr></div>
            <p class="section-description">Bienvenue, ici vous pouvez en apprendre davantage sur moi et découvrir mes compétences.</p>
         </div>
         <div class="profile-content d-grid ai-center gap-8">
            <div class="profile-info text-center d-flex fd-column ai-center">
               <div class="video-container octagon d-flex js-center jc-center ai-center p-relative">
                  <video autoplay muted loop class="octagon p-relative">
                     <source src="/meta-noc-cropped.mp4" type="video/mp4">
                  </video>
                  <div class="holo-video-overlay"></div>
                  <div class="holo-video-front"></div>
               </div>
               <div class="profile-details">
                  <h3>Geoffrey</h3>
                  <span>Développeur</span>
                  <p class="profile-tagline">Passionné par l'innovation</p>
               </div>
               <div class="hero-actions">
                  <ul class="gap-1 d-flex">
                     <li>
                        <a href="https://github.com/Noctuaa" class="btn-mini" target="_blank" rel="noopener">
                           <svg xmlns="http://www.w3.org/2000/svg" width="26" viewBox="0 0 640 640"></svg>
                        </a>
                     </li>
                     <li>
                        <a href="#contact" class="btn-mini">
                           <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 512 512"></svg>
                        </a>
                     </li>
                  </ul>
            </div>
            </div>
            <div class="separator-v separator-v-gradient js-center"></div>
            <div class="message-header-container p-relative">
               <div class="separator-h separator-h-gradient"></div>
               <div class="icon-message d-flex ai-center jc-center p-absolute ">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"> <!-- !Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                     <path d="M64 416L64 192C64 139 107 96 160 96L480 96C533 96 576 139 576 192L576 416C576 469 533 512 480 512L360 512C354.8 512 349.8 513.7 345.6 516.8L230.4 603.2C226.2 606.3 221.2 608 216 608C202.7 608 192 597.3 192 584L192 512L160 512C107 512 64 469 64 416z"/>
                  </svg>
               </div>
            </div>
            <div class="profile-card js-center p-relative">
               <div class="profile-card-header d-flex ai-center p-absolute gap-4">
                  <img src="/noc-avatar.jpg" alt="">
                  <span class="username">Noc</span>
               </div>
               <p class="profile-card-text"> 
                  <span class="hello-greeting">Hello ! 👋</span><br>
                  <br>
                  Je suis diplômé développeur Frontend par l'école Openclassrooms.<br>
                  Passionné, je suis toujours à la recherche de nouveaux défis pour m'améliorer, 
                  la satisfaction d'augmenter mes compétences en apprenant de jour en jour.<br>
                  Je vous présente ici mes compétences ainsi que mon expérience.<br>
                  J'aimerais partager mes connaissances et en apprendre plus avec d'autres développeurs.<br>
                  N'hésitez pas à me contacter je serai heureux d'échanger avec vous.</p>
                  <button class="btn btn-gradient profile-card-button p-absolute" @click="handleScrollToCompetences">Voir mes compétences</button>
            </div>
         </div>
      </div>
   </section>
</template>


<style>

.hero-actions {
    margin-top: 1rem;
  }

</style>