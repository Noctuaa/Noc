/**
 * @fileoverview ScrollManager - Manages smooth scrolling with Lenis and GSAP ScrollTrigger
 * Handles smooth scroll initialization, navigation, and curtain effect animations, and utility functions.
 */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/** @constant DURATION - Default scroll animation duration in seconds */
export const DURATION = 1.5;

const SECTIONS_AFTER_PROFILE = ['#competences', '#portfolio', '#contact'];

// Shared Lenis instance
let lenis: Lenis | null = null;

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
    duration: DURATION,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).lenis = lenis;


  // Sync Lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis!.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  console.log('✅ Lenis smooth scroll initialized');
  return lenis;
};

/**
 * Throttle a function to execute at most once per delay period
 * @param func - Function to throttle
 * @param delay - Minimum delay between executions in milliseconds
 * @returns Throttled function
 */
export const throttle = <T extends unknown[]>(func: (...args: T) => void, delay: number) => {
  let lastCall = 0;
  return (...args: T) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

/**
 * Initialize smooth scroll for all anchor links
 * Intercepts all a[href^="#"] clicks and delegates to Lenis Special handling for #profile (scrolls to hero height to trigger curtain effect)
 */
export const initAnchorLinks = () => {
  const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
  const profileSection = document.querySelector<HTMLElement>('#profile');

  anchors.forEach((anchor: Element) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      (window as any).lenis?.start();
      const href = anchor.getAttribute('href') ?? '';
      const target = href === '#profile' ? document.querySelector<HTMLElement>('#hero')?.offsetHeight ?? window.innerHeight : href;
      if (SECTIONS_AFTER_PROFILE.includes(href)) profileSection?.classList.remove('curtain-fixed');
      lenis!.scrollTo(target, { duration: DURATION, offset: 0 });
    });
  });
};

/**
 * Initialize curtain effect between Hero and Profile sections
 * Profile section stays fixed behind Hero, then reveals when Hero scrolls away
 * Adds/removes 'curtain-fixed' class based on scroll position
 */
export const initCurtainEffect = () => {
  const heroSection = document.querySelector<HTMLElement>('#hero');
  const profileSection = document.querySelector<HTMLElement>('#profile');

  if (!heroSection || !profileSection) {
    console.warn('⚠ Hero or Profile not found');
    return;
  }

  const heroBottom = heroSection.offsetHeight;

  // Initial state: fix Profile if at top
  if (window.scrollY < heroBottom) {
    profileSection.classList.add('curtain-fixed');
  }

  // Toggle fixed class when Hero scrolls out of view
  ScrollTrigger.create({
    trigger: heroSection,
    start: 'top top',
    end: 'bottom',
    onLeave: () => profileSection.classList.remove('curtain-fixed'),
    onEnterBack: () => profileSection.classList.add('curtain-fixed'),
    markers: false,
  });

  console.log('✅ Curtain effect initialized');
};
