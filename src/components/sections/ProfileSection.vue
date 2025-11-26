<script setup>
import { onMounted, ref } from 'vue';
import { scrollTo } from '../../utils/ScrollManager';
import SocialButtons from '../ui/SocialButtons.vue';

// Controls curtain-fixed class (true when section should be fixed behind Hero)
const isCurtainFixed = ref(false);

/**
 * Smooth scroll to Competences section
 * @returns {void}
 */
const handleScrollToCompetences = () => {
  scrollTo('#competences');
};

onMounted(() => {
  // Fix curtain effect on load - only add curtain-fixed if at top of page
  isCurtainFixed.value = window.scrollY === 0;
});
</script>

<template>
  <section id="profile" :class="['section d-flex ai-center jc-center', { 'curtain-fixed': isCurtainFixed }]">
    <div class="container">
      <div class="section-header">
        <h2>Profil</h2>
        <div class="divider"><hr /></div>
        <p class="section-description">
          Bienvenue, ici vous pouvez en apprendre davantage sur moi et découvrir mes compétences.
        </p>
      </div>
      <div class="profile-content d-grid ai-center gap-8 rounded-lg">
        <div class="profile-info tt-center d-flex fd-column ai-center">
          <div class="profile-video-container octagon d-flex js-center jc-center ai-center p-relative">
            <video autoplay muted loop class="octagon p-relative">
              <source src="/meta-noc-cropped.mp4" type="video/mp4" />
            </video>
            <div class="profile-video-overlay p-absolute w-100 h-100"></div>
            <div class="profile-video-front p-absolute w-100 h-100"></div>
          </div>
          <div class="profile-details">
            <h3>Geoffrey</h3>
            <span>Développeur</span>
            <p class="profile-tagline">Passionné par l'innovation</p>
          </div>
          <SocialButtons client:load />
        </div>
        <div class="separator-v separator-v-gradient js-center"></div>
        <div class="profile-messenger">
          <div class="profile-messenger-decorator p-relative">
            <div class="separator-h separator-h-gradient"></div>
            <div class="icon-message d-flex ai-center jc-center p-absolute">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <!-- !Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                <path
                  d="M64 416L64 192C64 139 107 96 160 96L480 96C533 96 576 139 576 192L576 416C576 469 533 512 480 512L360 512C354.8 512 349.8 513.7 345.6 516.8L230.4 603.2C226.2 606.3 221.2 608 216 608C202.7 608 192 597.3 192 584L192 512L160 512C107 512 64 469 64 416z"
                />
              </svg>
            </div>
          </div>
          <div class="profile-messenger-card d-flex fd-column js-center p-relative rounded-sm">
            <div class="profile-messenger-header d-flex jc-between ai-center rounded-md gap-4">
              <div class="d-flex ai-center gap-4">
                <img src="/noc-avatar.jpg" alt="Avatar NocDev" class="rounded" />
                <span class="username">Noc</span>
              </div>
              <div class="d-flex gap-3">
                <!-- Phone icon-->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon-messenger" viewBox="0 0 512 512">
                  <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                  <path
                    d="M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z"
                  />
                </svg>
                <!-- Video icon-->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon-messenger" viewBox="0 0 576 512">
                  <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                  <path
                    d="M96 64c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L96 64zM464 336l73.5 58.8c4.2 3.4 9.4 5.2 14.8 5.2 13.1 0 23.7-10.6 23.7-23.7l0-240.6c0-13.1-10.6-23.7-23.7-23.7-5.4 0-10.6 1.8-14.8 5.2L464 176 464 336z"
                  />
                </svg>
                <!-- Settings icon-->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon-messenger" viewBox="0 0 128 512">
                  <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                  <path
                    d="M64 144a56 56 0 1 1 0-112 56 56 0 1 1 0 112zm0 224c30.9 0 56 25.1 56 56s-25.1 56-56 56-56-25.1-56-56 25.1-56 56-56zm56-112c0 30.9-25.1 56-56 56s-56-25.1-56-56 25.1-56 56-56 56 25.1 56 56z"
                  />
                </svg>
              </div>
            </div>
            <div class="p-8">
              <div class="chat-bubble">
                <span class="hello-greeting">Hello ! 👋</span>
              </div>
              <div class="chat-bubble">
                <p>
                  Je suis diplômé développeur Frontend par l'école Openclassrooms.
                  <br />
                  Passionné, je suis toujours à la recherche de nouveaux défis pour m'améliorer, la satisfaction
                  d'augmenter mes compétences en apprenant de jour en jour.
                </p>
              </div>
              <div class="chat-bubble">
                <p>
                  Je vous présente ici mes compétences ainsi que mon expérience.
                  <br />
                  J'aimerais partager mes connaissances et en apprendre plus avec d'autres développeurs.
                  <br />
                  N'hésitez pas à me contacter je serai heureux d'échanger avec vous.
                </p>
              </div>
              <div class="chat-bubble">
                <button class="btn btn-gradient profile-card-button" @click="handleScrollToCompetences">
                  Voir mes compétences
                </button>
              </div>
            </div>
            <div class="profile-messenger-footer d-flex jc-between gap-5 mt-5">
              <div class="profile-messenger-tools d-flex ai-center jc-center gap-3 mx-5">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon-messenger" viewBox="0 0 512 512">
                  <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                  <path
                    d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM101.6 314c-3.7-13.7 7.5-26 21.7-26l265.4 0c14.2 0 25.4 12.3 21.7 26-18.5 68-80.6 118-154.4 118S120 382 101.6 314zM176 164c-15.5 0-28 12.5-28 28l0 8c0 11-9 20-20 20s-20-9-20-20l0-8c0-37.6 30.4-68 68-68s68 30.4 68 68l0 8c0 11-9 20-20 20s-20-9-20-20l0-8c0-15.5-12.5-28-28-28zm132 28l0 8c0 11-9 20-20 20s-20-9-20-20l0-8c0-37.6 30.4-68 68-68s68 30.4 68 68l0 8c0 11-9 20-20 20s-20-9-20-20l0-8c0-15.5-12.5-28-28-28s-28 12.5-28 28z"
                  />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon-messenger" viewBox="0 0 512 512">
                  <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                  <path
                    d="M224.6 12.8c56.2-56.2 147.4-56.2 203.6 0s56.2 147.4 0 203.6l-164 164c-34.4 34.4-90.1 34.4-124.5 0s-34.4-90.1 0-124.5L292.5 103.3c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L185 301.3c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l164-164c31.2-31.2 31.2-81.9 0-113.1s-81.9-31.2-113.1 0l-164 164c-53.1 53.1-53.1 139.2 0 192.3s139.2 53.1 192.3 0L428.3 284.3c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L343.4 459.6c-78.1 78.1-204.7 78.1-282.8 0s-78.1-204.7 0-282.8l164-164z"
                  />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon-messenger" viewBox="0 0 576 512">
                  <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                  <path
                    d="M96 96c0-35.3 28.7-64 64-64l320 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64l-320 0c-35.3 0-64-28.7-64-64L96 96zM24 128c13.3 0 24 10.7 24 24l0 296c0 8.8 7.2 16 16 16l360 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L64 512c-35.3 0-64-28.7-64-64L0 152c0-13.3 10.7-24 24-24zm168 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm196.5 11.5c-4.4-7.1-12.1-11.5-20.5-11.5s-16.1 4.4-20.5 11.5l-56.3 92.1-24.5-30.6c-4.6-5.7-11.4-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4S174.8 352 184 352l272 0c8.7 0 16.7-4.7 20.9-12.3s4.1-16.8-.5-24.3l-88-144z"
                  />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon-messenger" viewBox="0 0 384 512">
                  <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                  <path
                    d="M192 0C139 0 96 43 96 96l0 128c0 53 43 96 96 96s96-43 96-96l0-128c0-53-43-96-96-96zM48 184c0-13.3-10.7-24-24-24S0 170.7 0 184l0 40c0 97.9 73.3 178.7 168 190.5l0 49.5-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-49.5c94.7-11.8 168-92.6 168-190.5l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 79.5-64.5 144-144 144S48 303.5 48 224l0-40z"
                  />
                </svg>
              </div>
              <div class="profile-messenger-input w-100"></div>
              <div class="profile-messenger-send button-rounded-sm mx-5">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon-messenger icon-white" viewBox="0 0 576 512">
                  <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                  <path
                    d="M536.4-26.3c9.8-3.5 20.6-1 28 6.3s9.8 18.2 6.3 28l-178 496.9c-5 13.9-18.1 23.1-32.8 23.1-14.2 0-27-8.6-32.3-21.7l-64.2-158c-4.5-11-2.5-23.6 5.2-32.6l94.5-112.4c5.1-6.1 4.7-15-.9-20.6s-14.6-6-20.6-.9L229.2 276.1c-9.1 7.6-21.6 9.6-32.6 5.2L38.1 216.8c-13.1-5.3-21.7-18.1-21.7-32.3 0-14.7 9.2-27.8 23.1-32.8l496.9-178z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
