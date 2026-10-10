import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { content } from '../content/content';
import Magnetic from '../components/Magnetic';
import { getLenis } from '../hooks/useLenis';
import styles from '../styles/Section01Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Section01Hero({ isSplashActive = false }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timecode, setTimecode] = useState('00:04:12:18');
  const [isLocked, setIsLocked] = useState(false);
  const heroRef = useRef(null);

  // Live 24fps cine timecode generator
  useEffect(() => {
    let frame = 18;
    let sec = 12;
    let min = 4;
    let hr = 0;

    const interval = setInterval(() => {
      frame++;
      if (frame >= 24) {
        frame = 0;
        sec++;
        if (sec >= 60) {
          sec = 0;
          min++;
          if (min >= 60) {
            min = 0;
            hr++;
          }
        }
      }
      const pad = (n) => n.toString().padStart(2, '0');
      setTimecode(`${pad(hr)}:${pad(min)}:${pad(sec)}:${pad(frame)}`);
    }, 1000 / 24);

    return () => clearInterval(interval);
  }, []);

  // Autofocus box hunt & lock animation + shutter flash (triggers once splash fades out)
  useGSAP(() => {
    if (isSplashActive) {
      gsap.set('.' + styles.editorialBlock, { opacity: 0, y: 25 });
      return;
    }

    const tl = gsap.timeline({
      delay: 0.2,
      onComplete: () => setIsLocked(true)
    });

    // 1. Focus box hunts (pulses and scans)
    tl.to('.' + styles.focusBox, {
      scale: 1.15,
      borderColor: 'rgba(230, 200, 119, 0.4)',
      duration: 0.45,
      repeat: 2,
      yoyo: true,
      ease: 'power1.inOut'
    });

    // 2. Focus locks, snaps sharp
    tl.to('.' + styles.focusBox, {
      scale: 1,
      borderColor: 'var(--color-gold-sheen)',
      boxShadow: '0 0 16px rgba(230, 200, 119, 0.8)',
      duration: 0.25,
      ease: 'back.out(2)'
    });

    // 3. Shutter flash & image unblur (capturing the main hero image)
    tl.fromTo('.' + styles.shutterFlash,
      { opacity: 0 },
      { opacity: 0.8, duration: 0.06, yoyo: true, repeat: 1 },
      '-=0.1'
    );

    tl.to('.' + styles.heroImageCurrent, {
      filter: 'blur(0px) contrast(1.05) saturate(1.06) brightness(0.96)',
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.1');

    // Entrance animation for editorial block
    tl.fromTo('.' + styles.editorialBlock,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
      '-=0.4'
    );
  }, { scope: heroRef, dependencies: [isSplashActive] });

  // Cycle through hero slides with iris wipe (starts after splash is completed)
  useEffect(() => {
    if (isSplashActive) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % content.hero.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isSplashActive]);

  const slide = content.hero[currentSlide];

  const handleCtaClick = () => {
    const target = document.getElementById('booking');
    if (!target) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className={styles.heroSection}
      aria-label="Candid Pixel Studios Viewfinder Hero"
    >
      {/* Zoomed-Out Director's Cinema Viewport Frame */}
      <div className={styles.cinemaViewport}>
        {/* Dynamic Background Image Array with Iris Transition */}
        <div className={styles.imageStage}>
          {content.hero.map((item, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={item.id}
                className={`${styles.imageSlide} ${isActive ? styles.activeSlide : ''}`}
              >
                <img
                  src={item.url}
                  alt={`${item.couple} - ${item.location}`}
                  className={styles.heroImageCurrent}
                  style={{ objectPosition: item.objectPosition || 'center 40%' }}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
            );
          })}
          {/* Subtle Vignette Overlay */}
          <div className={styles.vignetteOverlay}></div>
          {/* Instantaneous Shutter Flash Div */}
          <div className={styles.shutterFlash}></div>
        </div>

        {/* Camera Viewfinder Overlay HUD */}
        <div className={styles.viewfinderHud} aria-hidden="true">
          {/* Four Corner Viewfinder Brackets */}
          <div className={`${styles.cornerBracket} ${styles.cornerTopLeft}`}></div>
          <div className={`${styles.cornerBracket} ${styles.cornerTopRight}`}></div>
          <div className={`${styles.cornerBracket} ${styles.cornerBottomLeft}`}></div>
          <div className={`${styles.cornerBracket} ${styles.cornerBottomRight}`}></div>

          {/* Top Viewfinder Bar */}
          <div className={styles.hudTop}>
            <div className={styles.recIndicator}>
              <span className={styles.recDot}></span>
              <span className={styles.recText}>REC 4K DCI</span>
            </div>

            <div className={styles.centerFramingTick}></div>

            <div className={styles.timecodeDisplay}>
              <span className={styles.timecodeLabel}>TC</span>
              <span className={styles.timecodeDigits}>{timecode}</span>
            </div>
          </div>

          {/* Center Autofocus Hunting Box */}
          <div className={`${styles.focusBox} ${isLocked ? styles.focusLocked : ''}`}>
            <span className={styles.focusCrosshair}>+</span>
            <span className={styles.focusDistance}>{isLocked ? 'AF-C LOCK • 1.8m' : 'HUNTING...'}</span>
          </div>

          {/* Bottom Viewfinder Technical Bar */}
          <div className={styles.hudBottom}>
            <div className={styles.exposureSpecs}>
              <span className={styles.specItem}>{slide.aperture}</span>
              <span className={styles.specDivider}>&bull;</span>
              <span className={styles.specItem}>{slide.shutter}</span>
              <span className={styles.specDivider}>&bull;</span>
              <span className={styles.specItem}>{slide.iso}</span>
              <span className={styles.specDivider}>&bull;</span>
              <span className={styles.specItem}>{slide.focalLength}</span>
            </div>

            <div className={styles.subjectPillBottom}>
              <span className={styles.subjectCouple}>{slide.couple}</span>
              <span className={styles.subjectDivider}>&bull;</span>
              <span className={styles.subjectLocation}>{slide.location}</span>
            </div>

            <div className={styles.batteryHud}>
              <span className={styles.batteryIcon}>
                <span className={styles.batteryFill}></span>
              </span>
              <span className={styles.batteryPercent}>98%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Content Bar Below Viewport */}
      <div className={styles.editorialBlock}>
        <div className={styles.editorialInner}>
          <div className={styles.editorialLead}>
            <p className={styles.heroMicroLabel}>THE ARCHITECTURE OF WEDDING CINEMA & TIMELESS PORTRAITURE</p>
            <h1 className={styles.heroHeadline}>
              Where Raw Emotion Becomes Cinematic Legacy.
            </h1>
          </div>

          <div className={styles.ctaRow}>
            <Magnetic strength={0.45}>
              <button
                onClick={handleCtaClick}
                className={styles.ctaMagneticBtn}
                data-cursor="view"
                aria-label="Inquire for dates"
              >
                <span className={styles.ctaBtnSheen}></span>
                <span className={styles.ctaBtnText}>INQUIRE FOR DATES</span>
                <span className={styles.ctaBtnArrow}>&rarr;</span>
              </button>
            </Magnetic>

            <span className={styles.intakeBadge}>
              COMMISSIONING 2025 &bull; 2026 CALENDAR
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
