import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { content } from '../content/content';
import styles from '../styles/Section02Marquee.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Section02Marquee() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    // Scroll velocity linked speed
    let baseTween = gsap.to(trackRef.current, {
      xPercent: -50,
      ease: 'none',
      duration: 35,
      repeat: -1
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity() / 300);
        gsap.to(baseTween, {
          timeScale: 1 + Math.min(velocity, 4),
          duration: 0.4,
          overwrite: 'auto'
        });
      }
    });
  }, { scope: containerRef });

  const items = [...content.services, ...content.services];

  return (
    <section ref={containerRef} id="marquee" className={styles.marqueeSection} aria-label="Services Strip">
      <div className={styles.marqueeFadeLeft}></div>
      <div className={styles.marqueeFadeRight}></div>

      <div ref={trackRef} className={styles.marqueeTrack}>
        {items.map((svc, i) => (
          <div key={`${svc.id}-${i}`} className={styles.marqueeItem}>
            <span className={i % 2 === 0 ? styles.itemOutline : styles.itemFilled}>
              {svc.name.toUpperCase()}
            </span>
            <span className={styles.apertureSeparator}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                <circle cx="12" cy="12" r="9" stroke="var(--color-gold-light)" strokeWidth="1.2" />
                <path d="M12 3L16 12M21 9L12 16M18 20L8 15M7 21L8 11M3 14L12 8M6 4L15 8" stroke="var(--color-gold-deep)" strokeWidth="1" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
