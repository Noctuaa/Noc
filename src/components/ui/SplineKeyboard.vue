<script setup>
   import { onMounted, ref } from 'vue';

   const canvasRef = ref(null)
   const loaded = ref(false)


   onMounted(async () => {
      try {
          const { Application } = await import('@splinetool/runtime')
          const app = new Application(canvasRef.value)
          //await app.load('https://prod.spline.design/mMLh0zDBf1HYIJjD/scene.splinecode');

          await app.load('/keyboard.spline');
         //canvasRef.value.classList.add('loaded')
         loaded.value = true

          console.log('Spline keyboard loaded!')
        } catch (error) {
          console.error('Error loading Spline:', error)
        }
      })

      
</script>

<template>
   <div class="spline-container h-100 d-flex jc-center">
         <canvas v-show="loaded" id="canvas3D"  ref="canvasRef" class="spline-canvas p-relative"></canvas>
   </div>
   
</template>

<style>

  .spline-canvas {
    width: 100% !important;
    height: auto !important;
    max-width: 1100px; /* ou ce que tu veux */
    aspect-ratio: 16/9;
    transition: .3s ease-in-out;
    left: 20px;

    /*pointer-events: none !important;*/

  }



</style>