import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { content } from '../content/content';
import styles from '../styles/Section09Process.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Section09Process() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const ringRef = useRef(null);

  useGSAP(() => {
    // 1. Gold Timeline line fills vertically on scroll
    gsap.fromTo(lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: true
        }
      }
    );

    // 2. Rotating aperture lens ring following the scroll
    gsap.to(ringRef.current, {
      rotation: 720,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    // 3. Staggered reveal of timeline step cards
    gsap.fromTo('.' + styles.processStep,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%'
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="process" className={styles.processSection} aria-label="Process and F-Stops Timeline">
      <div className={styles.processWrapper}>
        <div className={styles.sectionHeader}>
          <div className={styles.badgeRow}>
            <span className={styles.indexNum}>09</span>
            <span className={styles.badgeText}>BEHIND THE FRAME &bull; CHRONOLOGY</span>
          </div>
          <h2 className={styles.title}>The Aperture Path</h2>
          <p className={styles.subtitle}>
            From initial calendar alignment to the sacred delivery casket, our process is measured in optical precision.
          </p>
        </div>

        <div className={styles.timelineStage}>
          {/* Central Line & Rotating Aperture Ring */}
          <div className={styles.lineContainer}>
            <div ref={lineRef} className={styles.timelineLine}></div>
            <div ref={ringRef} className={styles.rotatingLensRing}>
              <svg viewBox="0 0 100 100" width="46" height="46">
                <circle cx="50" cy="50" r="44" stroke="var(--color-gold-light)" strokeWidth="2" fill="var(--color-navy-deep)" />
                <circle cx="50" cy="50" r="28" stroke="var(--color-gold-deep)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                <circle cx="50" cy="50" r="12" fill="var(--color-gold-sheen)" />
              </svg>
            </div>
          </div>

          {/* F-Stop Step Rows */}
          <div className={styles.stepsList}>
            {content.process.map((step, idx) => (
              <div key={step.fStop} className={styles.processStep}>
                <div className={styles.fStopBadgeBox}>
                  <span className={styles.fStopLabel}>{step.fStop}</span>
                  <span className={styles.stepTiming}>{step.duration}</span>
                </div>

                <div className={styles.stepCardContent}>
                  <h3 className={styles.stepName}>{step.label}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
