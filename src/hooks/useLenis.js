import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let globalLenis = null;

export function getLenis() {
  return globalLenis;
}

export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis with luxury inertia
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false
    });

    lenisRef.current = lenis;
    globalLenis = lenis;

    // Sync Lenis scroll events with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Sync GSAP ticker with Lenis requestAnimationFrame
    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0, 0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      globalLenis = null;
    };
  }, []);

  return lenisRef;
}
