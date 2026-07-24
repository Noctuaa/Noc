/**                                                                             
 * @fileoverview AnimationManager - Manages GSAP animations for the portfolio   
 * Handles entrance animations and scroll-triggered animations for each section.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ============================================
   UTILS - Reusable internal functions
   ============================================ */

const animateSectionHeader = (section: string, trigger?: string, start?: string) => {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: trigger ?? section, start: start ?? 'top 80%', once: true }
  });

  tl.fromTo(`${section} h2`,
    { autoAlpha: 0, immediateRender: false },
    { autoAlpha: 1, duration: 0.6, ease: 'power3.out' }
  )
    .fromTo(`${section} .section-lead`,
      { y: 30 },
      {
        autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out'
      }, '-=0.4'
    )
    .fromTo(`${section} .section-header hr`,
      { scaleX: 0 },
      {
        autoAlpha: 1, scaleX: 1, duration: 0.6, ease: 'power3.out', transformOrigin: 'left center'
      }, '-=0.3'
    )
}


/**
 * Initialize hero entrance animations on page load
 * Sequential appearance: title → subtitle → icons → scroll button
 */
const initHeroAnimations = () => {
  const tl = gsap.timeline();

  tl.fromTo('.hero-content h1',
    { y: -80 },
    { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }
  )
    .fromTo('.hero-content p',
      { y: -40 },
      { autoAlpha: .9, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3'
    )
    .fromTo('.hero-content a',
      { y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3'
    );
};

/**
 * Initialize profile section scroll animations
  * Chat bubbles and info items fade in with stagger on scroll
 */
const initProfileAnimations = () => {
  animateSectionHeader('#profile');

  gsap.fromTo('.profile-avatar',
    { scale: 0.8 },
    {
      autoAlpha: 1, scale: 1, duration: 0.3, ease: 'back.out(1.7)',
      scrollTrigger: { trigger: '.profile-avatar', start: 'top 80%', once: true }
    }
  );

  gsap.fromTo('#profile .info-item, #profile .work-method-item',
    { y: 20 },
    {
      autoAlpha: 1, y: 0, duration: 0.3, ease: 'back.out(1.4)', stagger: 0.2, delay: .2,
      scrollTrigger: { trigger: '.profile-identity', start: 'top 80%', once: true }
    }
  );

  gsap.fromTo('.work-method',
    { y: 20 },
    {
      autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out',
      scrollTrigger: { trigger: '.work-method', start: 'top 90%', once: true }
    }
  );
}

/**
  * Initialize competences section scroll animations
  * Section header + carousel rows fade in on scroll
  */
const initCompetencesAnimations = () => {
  animateSectionHeader('#competences');

  gsap.to('.scroller-inner',
    {
      autoAlpha: 1, duration: 1, ease: 'back.out(1.7)',
      stagger: 0.3,
      scrollTrigger: { trigger: '.scroller', start: 'top 80%', once: true }
    }
  );
}

/**
 * Initialize portfolio section scroll animations
 * Project accordion entrance on scroll
 */
const initProjectAnimations = () => {
  animateSectionHeader('#projects');
  gsap.fromTo('#projects .accordion',
    { y: 40 },
    {
      autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '#projects .accordion', start: 'top 60%', once: true }
    }
  );

}

/**
 * Initialize contact section scroll animations
 * Section header + contact form entrance on scroll
 */
const initContactAnimations = () => {
  animateSectionHeader('#contact');
  gsap.fromTo('#contact .contact-form',
    { y: 40 },
    {
      autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '#contact .contact-form', start: 'top 60%', once: true }
    }
  );

}

/**
 * Initialize all section animations
 * Called once on page load to set up all scroll triggers and entrance animations
 */
export const initAnimations = () => {
  initHeroAnimations();
  initProfileAnimations();
  initCompetencesAnimations();
  initProjectAnimations();
  initContactAnimations();
}