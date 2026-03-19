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

const animateSectionHeader = (section: string, trigger?: string) => {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: trigger ?? section, start: 'bottom 10%' }
  });

  tl.fromTo(`${section} h2`,
    { autoAlpha: 0, immediateRender: false },
    { autoAlpha: 1, duration: 0.7, ease: 'power3.out' }
  )
    .fromTo(`${section} .section-description`,
      { y: 30 },
      {
        autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out'
      }, '-=0.2'
    )
    .fromTo(`${section} .separator-h`,
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

/**
 * Initialize profile section scroll animations
 * Sequential appearance triggered when section enters viewport
 */
export const initProfileAnimations = () => {
  animateSectionHeader('#profile', '.hero');

  const tl = gsap.timeline({
    scrollTrigger: { trigger: '#hero', start: 'bottom 25%', once: true },
    delay: 0.8
  });

  tl.fromTo('.profile-header',
    { y: -60 },
    { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }
  )
    .fromTo('.profile-info',
      { x: 100 },
      { autoAlpha: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=0.8'
    )
    .fromTo('.profile-chat',
      { x: -100 },
      { autoAlpha: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=0.8'
    )
    .fromTo('.profile-avatar',
      { autoAlpha: 0, scale: 0.8 },
      { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
    )
    .fromTo('.chat-bubble',
      { x: -30 },
      { autoAlpha: 1, x: 0, duration: 0.5, ease: 'back.out(1.4)', stagger: 0.2 }, '-=0.2'
    )
    .fromTo('.profile-info .info-item',
      { x: 30 },
      { autoAlpha: 1, x: 0, duration: 0.5, ease: 'back.out(1.4)', stagger: 0.2 }, '-=0.7'
    )
}