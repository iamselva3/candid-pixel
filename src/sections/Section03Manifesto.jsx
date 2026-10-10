import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/Section03Manifesto.module.css';

gsap.registerPlugin(ScrollTrigger);

const MANIFESTO_TEXT = "We refuse to treat sacred vows as catalog photography. We craft cinematic relics. In an era of hurried reels and algorithmic posing, Candid Pixel operates as an old-world visual atelier. Every frame is illuminated with purpose, graded with fine art restraint, and preserved to outlive the century.";

export default function Section03Manifesto() {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);

  useGSAP(() => {
    // 1. Gold hairline draws alongside the paragraph
    gsap.fromTo('.' + styles.verticalHairline,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 40%',
          scrub: true
        }
      }
    );

    // 2. Word-by-word reveal from muted grey to bright ivory
    gsap.fromTo(wordsRef.current,
      { color: 'var(--color-text-dim)', opacity: 0.35 },
      {
        color: 'var(--color-text-ivory)',
        opacity: 1,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 65%',
          end: 'bottom 50%',
          scrub: 0.5
        }
      }
    );
  }, { scope: containerRef });

  const words = MANIFESTO_TEXT.split(' ');

  return (
    <section ref={containerRef} id="manifesto" className={styles.manifestoSection} aria-label="Atelier Manifesto">
      <div className={styles.manifestoWrapper}>
        <div className={styles.hairlineCol}>
          <div className={styles.verticalHairline}></div>
          <span className={styles.manifestoIndex}>03</span>
        </div>

        <div className={styles.contentCol}>
          <span className={styles.preHeading}>THE PHILOSOPHY OF THE ATELIER</span>
          <p className={styles.manifestoParagraph}>
            {words.map((word, i) => (
              <span
                key={i}
                ref={(el) => (wordsRef.current[i] = el)}
                className={styles.manifestoWord}
              >
                {word}{' '}
              </span>
            ))}
          </p>

          <div className={styles.subMetadata}>
            <div className={styles.metaBadge}>
              <span className={styles.metaDot}></span>
              <span>NATURAL LIGHT &bull; CINE PRIMES ONLY</span>
            </div>
            <div className={styles.metaBadge}>
              <span className={styles.metaDot}></span>
              <span>24 COMMISSIONS YEARLY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
