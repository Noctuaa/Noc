<script setup>
   import { onMounted, ref } from 'vue';
   import { gsap } from 'gsap';
   import { ScrollTrigger } from 'gsap/ScrollTrigger';

   gsap.registerPlugin(ScrollTrigger);

	const emit = defineEmits(['key-hover']); // Event

   const canvasRef = ref(null)
   const loaded = ref(false)
	const mounted = ref(false)
	const splineKeyboardUrl = '/keyboard.spline' || import.meta.env.VITE_SPLINE_KEYBOARD; // Configuration
	const currentHoveredKey = ref(null); // Hover tracking


	/**
	 * Setup keyboard hover events for user interaction.
	 * @function setupKeyboardEvent
	 * @param {Object} app - Spline Application instance 
	 * @emits key-hover - When a key is hovered, emits the key name.
	 */
	const setupKeyboardEvent = (app) => {
		app.addEventListener('mouseHover', (e) => {
			const keyName = e.target?.name || null;
			if(currentHoveredKey.value !== keyName) {
				currentHoveredKey.value = keyName;
				emit('key-hover', keyName);
			}
		})
		
	}

	/**
	 * Initializes and loads the Spline 3D keyboard scene.
	 * @async
	 * @function initSplineKeyboard
	 * @throws {Error} When Spline fails to load or scene file is not found.
	 * @returns {Promise<void>}
	 */
	const initSplineKeyboard = async () => {
		try {
			const { Application } = await import('@splinetool/runtime')
         const app = new Application(canvasRef.value)
			await app.load(splineKeyboardUrl)

			setupKeyboardEvent(app)

		} catch (error) {
			console.error('Error loading Spline:', error)
		}
	}

	/**
	 * Configure GSAP ScrollTrigger for keyboard visibility animation.
	 * @function setupScrollTrigger
	 * @requires gsap and ScrollTrigger plugin.
	 * @listens scroll - Triggers on section scroll events.
	 */
	const setupScrollTrigger = () => {
		ScrollTrigger.create({
			trigger: '#competences',
			start: 'top 10%',
			end: 'bottom center',
			onEnter: () => { loaded.value = true;},
			onLeaveBack: () => { loaded.value = false;}
		})
	}


   onMounted(async () => {
		mounted.value = true;
		await initSplineKeyboard();
		setupScrollTrigger();
   })

      
</script>

<template>
	<div>
		<teleport to='.teleport-container' v-if="mounted">
			<div :class="['spline-container h-100 d-flex jc-center', {visible: loaded}]">
				<canvas ref="canvasRef" id="canvas3D" class="spline-canvas p-relative"></canvas>
			</div>
		</teleport>
	</div>
</template>

<style>
  .spline-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -25%);
    width: 90vw;
    max-width: 1100px;
    height: auto;
    opacity: 0;
    z-index: 10;
    transition: opacity 0.3s ease;
	 pointer-events: none;
  }

   .spline-container.visible {
    opacity: 1 !important;
	 pointer-events: auto;
  }

  .spline-canvas {
    width: 100% !important;
    height: auto !important;
    aspect-ratio: 16/9;
    left: 0;
  }
</style>