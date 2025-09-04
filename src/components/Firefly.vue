
<script setup>
import { ref, onMounted } from 'vue'

// Firefly element reference
const fireflyEl = ref(null)

// Available animation classes for random selection
const animationClasses = ref(['zigzag-animation', 'dance-animation'])
const currentAnimation = ref('');

// Plays random animations in a cycle: random → float → repeat
const playRandomAnimation = () => {
  const randomIndex = Math.floor(Math.random() * animationClasses.value.length)
  currentAnimation.value = animationClasses.value[randomIndex]

  // Return to float animation after 4s
  setTimeout(() => {
    currentAnimation.value = 'float-animation'
  }, 4000)

  // Schedule next random animation after 12s
  setTimeout(playRandomAnimation, 12000)
}

onMounted(() => {
  // Initial spiral entrance animation
  currentAnimation.value = 'spiral-animation'
  
  // Start animation cycle after entrance
  setTimeout(playRandomAnimation, 4000)
})
</script>

<template>
  <div ref="fireflyEl" :class="currentAnimation" class="firefly">
    <div class="firefly-glow"></div>
  </div>
</template>



<style scoped>
  .firefly {
    position: fixed;
    right: 40%;
    top: 45%;
    width: 60px;
    height: 60px;
    z-index: 1000;
    pointer-events: none;
    transition: all 2s ease-in-out;
  }

  .firefly-glow {
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, #dfded4 0%, #d4cebc 30%, transparent 50%);
    border-radius: 50%;
    filter: blur(1px);
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { 
      transform: scale(1); 
    }
    50% { 
      transform: scale(1.2); 
    }
  }


  @keyframes zigzag {
    0% { transform: translate(0, 0); }
    25% { transform: translate(20px, -10px); }
    50% { transform: translate(-15px, -20px); }
    75% { transform: translate(25px, -30px); }
    100% { transform: translate(0, 0); }
  }
  .zigzag-animation { animation: zigzag 2s ease-in-out; }


  @keyframes spiralIn {
    0% { 
      transform: rotate(-360deg) scale(0.2);
      opacity: 0;
    }
    50% {
      transform: translateY(-40px) rotate(-180deg) scale(0.6);
      opacity: 0.5;
    }
    100% { 
      transform: translateY(0) rotate(0deg) scale(1);
      opacity: 1;
    }
  }
  .spiral-animation { animation: spiralIn 2s ease-out; }

  @keyframes float {
    0%, 100% { 
      transform: translateY(0px);
      opacity: 0.8;
    }
    50% { 
      transform: translateY(-15px);
      opacity: 1;
    }
  }
  .float-animation { animation: float 4s ease-in-out infinite; }

  @keyframes dance {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    10% { transform: translate(-5px, -8px) rotate(-10deg); }
    20% { transform: translate(8px, -5px) rotate(15deg); }
    30% { transform: translate(-3px, 6px) rotate(-8deg); }
    40% { transform: translate(6px, -3px) rotate(12deg); }
    50% { transform: translate(-8px, 8px) rotate(-15deg); }
    60% { transform: translate(5px, -6px) rotate(10deg); }
    70% { transform: translate(-6px, 3px) rotate(-12deg); }
    80% { transform: translate(3px, -8px) rotate(8deg); }
    90% { transform: translate(-2px, 5px) rotate(-5deg); }
  }
  .dance-animation { animation: dance 1.5s ease-in-out; }

  @keyframes fadeIn {
    0% { 
      transform: scale(0.2); 
      opacity: 0; 
    }
    100% { 
      transform: scale(1); 
      opacity: 1; 
    }
  }
  .fade-in-animation { animation: fadeIn 1s ease-out; }
</style>