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
            <div class="profile-info text-center d-flex fd-column ai-center">
               <div class="video-zone octagon tt js-center">
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
            <div class="separator-line"></div>
            <div class="message-container p-relative">
               <div class="separator-line-h"></div>
               <div class="message-notification d-flex ai-center jc-center ">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"> <!-- !Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                     <path d="M64 416L64 192C64 139 107 96 160 96L480 96C533 96 576 139 576 192L576 416C576 469 533 512 480 512L360 512C354.8 512 349.8 513.7 345.6 516.8L230.4 603.2C226.2 606.3 221.2 608 216 608C202.7 608 192 597.3 192 584L192 512L160 512C107 512 64 469 64 416z"/>
                  </svg>
               </div>
            </div>
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

.message-container{
   grid-area: 1/3/2/4;
   top: -40px;
   width: 100%;
}

.message-notification {
   position: absolute;
   top: 0%;
   left: 25px;
   width: 80px;
   height: 1px;
   background:#1D203E;
}

.message-notification::before{
   content: "";
   position: absolute;
   width: 45px;
   height: 45px;
   background: linear-gradient(135deg, #667eea, #764ba2);
   border-radius: 50%;
   box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
   animation: message-pulse 2s ease-in-out infinite;
   z-index: 1;
}
.message-notification::after {
    content: "";
    position: absolute;
    width: 4px;
    height: 4px;
    background: white;
    border-radius: 50%;
    top: -1px;
    box-shadow: 
      0 0 8px rgba(255, 255, 255, 1),
      0 0 16px rgba(255, 255, 255, 0.8), 
      0 0 24px rgba(255, 255, 255, 0.6),
      0 0 32px rgba(255, 255, 255, 0.4),
      0 0 40px rgba(102, 126, 234, 0.5);
    animation: orbit-scan 3s linear infinite;
  }

  @keyframes orbit-scan {
    0% { transform: rotate(0deg) translateX(25px) rotate(0deg); }
    100% { transform: rotate(360deg) translateX(25px) rotate(-360deg); }
  }


.message-notification svg {
   width: 25px;
   height: 25px;
   fill: white;
   position: relative;
   z-index: 2;
}

 @keyframes message-pulse {
    0%, 100% { transform: scale(1); box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3); }
    50% { transform: scale(1.05); box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5); }
  }

   .cta {
      position: absolute;
      bottom: -20px;
      left: 50px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border: 1px solid rgba(255, 255, 255, 0.2);
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
      padding: 4rem 2rem;
      backdrop-filter: blur(10px);
   }

   .hello-greeting {
    font-size: 1.2rem;
    font-weight: 700;
  }

   .video-zone {
      display: flex;
      align-items: center ;
      justify-content: center;
      position: relative;
      grid-area: 1/1/2/2;
      width: 265px;
      height: 265px;
   }


  @keyframes hologram-glitch {
    0%, 100% { transform: translate(0); }
    25% { transform: translate(1px, -1px); }
    50% { transform: translate(-1px, 1px); }
    75% { transform: translate(1px, 1px); }
  }

  .holo-video-overlay {
    position: absolute;
    top: 5px;
    left: 0px;
    width: 100%;
    height: 100%;
    clip-path: var(--octagon-clip);
   background: linear-gradient(135deg,
   rgb(27, 60, 120),
   rgb(22, 79, 115),
   rgb(72, 60, 161)
   );
    pointer-events: none;
    z-index: -1;
    transform: translateY(-2%);
  }

  .holo-video-front {
    position: absolute;
      width: 250px;
      height: 250px;
      

      clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
      background: linear-gradient(135deg,
      rgba(27, 60, 120, .090), 
      rgba(93, 39, 110, .090)
      );
      z-index: 2;
  }

   .video-zone video {
      position: relative;
      width: 250px;
      height: 250px;
      object-fit: cover;
      object-position: center bottom;
      z-index: 1;

   }   

   .profile-info {
      grid-area: 1/1/3/2;
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

   .separator-line-h{
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, rgba(99, 102, 241, 0.5), transparent);
    margin-bottom: 1rem;
    z-index: -1;
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
      background:#1D203E;
      top: -1px;
      left: 30px;
      gap: 1rem;
      height: 1px;
      width: 130px;

  }

  .profile-header img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

    .card-zone p {
    font-size: .9rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.9);
  }




</style>