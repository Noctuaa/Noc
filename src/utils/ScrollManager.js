/**
 * @fileoverview ScrollManager - Manages smooth scrolling with Lenis and GSAP ScrollTrigger
 * Handles smooth scroll initialization, navigation, and curtain effect animations
 */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/** @constant {number} DURATION - Default scroll animation duration in seconds */
const DURATION = 1.5;

// Shared Lenis instance
let lenis = null;

/**
 * Initialize Lenis smooth scrolling
 * Should be called once when the application starts
 */
export const initLenis = () => {
  if (lenis) {
    console.warn('Lenis is already initialized.');
    return lenis;
  }

  lenis = new Lenis({
    DURATION,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    smoothTouch: false,
  });

  // Sync Lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  console.log('✅ Lenis smooth scroll initialized');
  return lenis;
};

/**
 * Smooth scroll to a specific target
 * @param {string|number} target - CSS selector (e.g., '#profile') or pixel position (e.g., 1000)
 */
export const scrollTo = (target) => {
  if (!lenis) {
    console.error('Lenis not initialized');
    return;
  }
  lenis.scrollTo(target, { DURATION, offset: 0 });
};

/**
 * Initialize curtain effect between Hero and Profile sections
 * Profile section stays fixed behind Hero, then reveals when Hero scrolls away
 * Adds/removes 'curtain-fixed' class based on scroll position
 */
export const initCurtainEffect = () => {
  const heroSection = document.querySelector('#hero');
  const profileSection = document.querySelector('#profile');

  if (!heroSection || !profileSection) {
    console.warn('⚠ Hero or Profile not found');
    return;
  }

  /// Toggle fixed class when Hero scrolls out of view
  ScrollTrigger.create({
    trigger: heroSection,
    start: 'top top',
    end: 'bottom top',
    onLeave: () => profileSection.classList.remove('curtain-fixed'),
    onEnterBack: () => profileSection.classList.add('curtain-fixed'),
    markers: true,
  });

  console.log('✅ Curtain effect initialized');
};
