/**                                                                             
 * @fileoverview AnimationManager - Manages GSAP animations for the portfolio   
 * Handles entrance animations and scroll-triggered animations for each section.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize hero entrance animations on page load
 * Sequential appearance: title → subtitle → icons → scroll button
 */

export const initHeroAnimations = () => {
  const tl = gsap.timeline();

  tl.fromTo('.hero-content h1',
    { y: -80 },
    { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }
  )
    .fromTo('.hero-content p',
      { y: -40 },
      { autoAlpha: .9, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3'
    )
    .fromTo('.hero-content ul',
      { y: -40 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2'
    )
    .fromTo('.hero-scroll',
      { y: 40 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.1'
    );
};