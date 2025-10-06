<script setup>

</script>


<template>
   <section id="profile" class="section">
      <div class="container">
         <div class="section-header">
            <h2>Profil</h2>
            <div class="divider"><hr></div>
            <p class="section-description">Bienvenue, ici vous pouvez en apprendre davantage sur moi et découvrir mes compétences.</p>
         </div>
         <div class="profile-content d-grid gap-8">
            <div class="video-zone octagon js-center">
               <video autoplay muted loop>
                  <source src="/meta-noc.mp4" type="video/mp4">
               </video>
            </div>
            <div class="profile-info text-center d-flex fd-column ai-center">
               <h3>Geoffrey</h3>
               <span>Développeur</span>
               <p class="profile-tagline">Passionné par l'innovation</p>
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
            <div class="separator-line"></div>
            <div class="card-zone js-center p-relative">
               <div class="profile-header p-absolute">
                  <img src="/noc-avatar.jpg" alt="">
                  <span class="username">Noc</span>
               </div>
               
               <p> <span class="hello-greeting">Hello ! 👋</span><br>
                  <br>
                  Je suis diplômé développeur Frontend par l'école Openclassrooms.<br>
                  Passionné, je suis toujours à la recherche de nouveaux défis pour m'améliorer, 
                  la satisfaction d'augmenter mes compétences en apprenant de jour en jour.<br>
                  Je vous présente ici mes compétences ainsi que mon expérience.<br>
                  J'aimerais partager mes connaissances et en apprendre plus avec d'autres développeurs.<br>
                  N'hésitez pas à me contacter je serai heureux d'échanger avec vous.</p>
                  <button class="cta">Voir mes compétences</button>
            </div>
         </div>
      </div>
   </section>
</template>


<style scoped>

   .cta {
      position: absolute;
      bottom: -20px;
      left: 50px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border: none;
      border-radius: 25px;
      padding: 0.75rem 2rem;
      color: white;
      font-weight: 600;
      transition: all var(--transition-normal) ease;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
      cursor: pointer;
   }

     .card-zone button:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }


   .profile-content {
      grid-template-columns: 300px 20px 1fr;
      grid-template-rows: 1fr 1fr;
      align-items: center;
      background: rgba(45, 53, 97, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 2rem;
      backdrop-filter: blur(10px);
   }

   .hello-greeting {
    font-size: 1.2rem;
    font-weight: 700;
  }

   .video-zone {
      position: relative;
      width: 250px;
      height: 250px;
      grid-area: 1/1/2/2;
   }

   .video-zone::before {
      content: '';
      position: absolute;
      width: 300px;
      height: 300px;
      background: linear-gradient(135deg, #667eea, #764ba2, #667eea);
      clip-path: var(--octagon-clip);
      
   }


     .video-zone::after {
    /* ... ton overlay actuel ... */
    background:
      linear-gradient(45deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.1)),
      repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03)
  4px);
  }

   .video-zone:hover::after {
    animation: hologram-glitch 2s ease-in-out infinite;
  }

  @keyframes hologram-glitch {
    0%, 100% { transform: translate(0); }
    25% { transform: translate(1px, -1px); }
    50% { transform: translate(-1px, 1px); }
    75% { transform: translate(1px, 1px); }
  }



   .video-zone video {
      width: 100%;
      height: 100%;
      transform: translateY(-2%);
      object-fit: cover;
   }

   

   .profile-info {
      grid-area: 2 /1/3/2;
      margin-top: -5rem;
   }

   .profile-info h3 {
      margin-bottom: 0.5rem;
      font-size: 1.5rem;
      color: var(--color-text-primary);
  }

    .profile-info span {
      background: var(--gradient-primary);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 1.1rem;
      font-weight: 600;
      display: inline-block;
      margin-bottom: 0.5rem;
   }
   


   .profile-tagline {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.7);
      font-style: italic;
      margin: 0.5rem 0;
  }

   .hero-actions {
    margin-top: 1rem;
  }



   .separator-line{
    grid-area: 1/2/3/3;
    width: 1px;
    height: 100%;
    justify-self: center;
    background: linear-gradient(180deg, transparent, rgba(99, 102, 241, 0.5), transparent);
   }


   .card-zone{
      grid-area: 2/3/3/4;
      width: 80%;
      background: rgba(26, 31, 58, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 2rem;
      margin-top: -8rem;
      backdrop-filter: blur(8px);
      justify-self: center;
   }


   .username {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--color-text-primary);
  }



   .profile-header {
      display: flex;
      align-items: center;
      background: rgba(26, 31, 58, 0.8);
      top: -30px;
      left: 30px;
      gap: 1rem;
      padding: 0rem 1rem;
      backdrop-filter: blur(10px);

  }

  .profile-header img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

    .card-zone p {
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.9);
  }




</style>