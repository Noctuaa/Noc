/**
 * @fileoverview ScrollManager - Manages smooth scrolling with Lenis and GSAP ScrollTrigger
 * Handles smooth scroll initialization, navigation, and curtain effect animations, and utility functions.
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

  window.lenis = lenis; // Expose for debugging

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
 * Throttle a function to execute at most once per delay period
 * Useful for performance optimization on high-frequency events+(scroll, resize, mousemove)
 * @param {Function} func - Function to throttle
 * @param {number} delay - Minimum delay between executions in +milliseconds
 * @returns {Function} Throttled function
 * @example  const handleScrollThrottled = throttle(handleScroll, 100); // +Max 10 executions/second
 */
export const throttle = (func, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
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
  // For sections after Profile, remove curtain-fixed FIRST
  const sectionsAfterProfile = ['#competences', '#portfolio', '#contact'];
  const profileSection = document.querySelector('#profile');

  if (sectionsAfterProfile.includes(target) && profileSection.classList.contains('curtain-fixed')) {
    profileSection.classList.remove('curtain-fixed');
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
  // Initial state: fix Profile if at top
  if (window.scrollY === 0) {
    profileSection.classList.add('curtain-fixed');
  }

  /// Toggle fixed class when Hero scrolls out of view
  ScrollTrigger.create({
    trigger: heroSection,
    start: 'top top',
    end: 'bottom top',
    onLeave: () => profileSection.classList.remove('curtain-fixed'),
    onEnterBack: () => profileSection.classList.add('curtain-fixed'),
    markers: false,
  });

  console.log('✅ Curtain effect initialized');
};

/**
 * Initialize ScrollTrigger animations for Profile section
 * - Sequential appearance of chat bubbles (messaging effect)
 * - 0.3s delay between each bubble with bounce effect
 */
export const initProfileAnimations = () => {
  const chatBubbles = gsap.utils.toArray('.profile-messenger-body .chat-bubble');

  // Trigger based on Hero section leaving (not Profile entering)
  ScrollTrigger.create({
    trigger: '#hero',
    start: 'bottom 30%',
    onEnter: () => {
      // Sequential animation with progressive delay
      chatBubbles.forEach((bubble, index) => {
        gsap.to(bubble, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.3, // 0s, 0.3s, 0.6s, 0.9s...
          ease: 'power2.out', // Small bounce at the end
        });
      });
    },
  });
};
