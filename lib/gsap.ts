import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Default animation configs for consistency
export const animations = {
  // Fade up entrance
  fadeUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    duration: 0.8,
    ease: "power3.out",
  },

  // Stagger reveal for lists
  stagger: {
    each: 0.1,
    from: "start",
    ease: "power2.out",
  },

  // Text reveal (for split text)
  textReveal: {
    initial: { opacity: 0, y: 100, rotateX: -90 },
    animate: { opacity: 1, y: 0, rotateX: 0 },
    duration: 1,
    ease: "power4.out",
  },

  // Scale in
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    duration: 0.6,
    ease: "back.out(1.7)",
  },
};

// Create a scroll-triggered animation
export function createScrollTrigger(
  trigger: string | Element,
  animation: gsap.TweenVars,
  options?: ScrollTrigger.Vars
) {
  return gsap.to(trigger, {
    ...animation,
    scrollTrigger: {
      trigger,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
      ...options,
    },
  });
}

// Parallax effect helper
export function createParallax(
  element: string | Element,
  speed: number = 0.5,
  options?: ScrollTrigger.Vars
) {
  return gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      ...options,
    },
  });
}

export { gsap, ScrollTrigger };
