import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { getLenis } from '../hooks/useLenis';
import styles from '../styles/Splash.module.css';

/**
 * Web Audio synthetic shutter click (zero dependencies, completely self-contained)
 */
function playSynthesizedShutterClick() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.08);

    filter.type = 'highpass';
    filter.frequency.setValueAtTime(80, ctx.currentTime);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch {
    // Audio context prevented by browser policy - silent fallback
  }
}

export default function Splash({ onComplete }) {
  const [counter, setCounter] = useState(0);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  // Lock Lenis scroll while splash is active
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) lenis.stop();
    document.body.classList.add('loading');

    return () => {
      const activeLenis = getLenis();
      if (activeLenis) activeLenis.start();
      document.body.classList.remove('loading');
    };
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        const lenis = getLenis();
        if (lenis) lenis.start();
        document.body.classList.remove('loading');
        onComplete();
      }
    });
    timelineRef.current = tl;

    // Numerical counter 000 -> 100
    const counterObj = { val: 0 };
    tl.to(counterObj, {
      val: 100,
      duration: 4.2,
      ease: 'power2.inOut',
      onUpdate: () => setCounter(Math.floor(counterObj.val))
    }, 0);

    // 1. Film grain fades in & Central Gold Hairline draws top to bottom
    tl.fromTo('.' + styles.grain, { opacity: 0 }, { opacity: 0.18, duration: 0.8 }, 0);
    tl.fromTo('.' + styles.hairlineSvg + ' line',
      { strokeDashoffset: 1000 },
      { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' },
      0.2
    );

    // 2. Line splits & Camera Body fades in with soft navy glow on left
    tl.to('.' + styles.hairlineSvg, { opacity: 0.4, scaleX: 1.2, duration: 0.5 }, 1.3);
    tl.fromTo('.' + styles.cameraBodyGlow,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
      1.1
    );

    // Rotating lens focus rings draw in concentric circles
    tl.fromTo('.' + styles.lensRingOuter,
      { strokeDashoffset: 600, rotation: -90 },
      { strokeDashoffset: 0, rotation: 180, duration: 1.4, ease: 'power2.out', transformOrigin: 'center center' },
      1.3
    );
    tl.fromTo('.' + styles.lensRingInner,
      { strokeDashoffset: 400, rotation: 90 },
      { strokeDashoffset: 0, rotation: -180, duration: 1.4, ease: 'power2.out', transformOrigin: 'center center' },
      1.4
    );

    // Shimmer sweep across the brushed metal aperture
    tl.fromTo('.' + styles.shimmerSweep,
      { xPercent: -150, opacity: 0 },
      { xPercent: 150, opacity: 0.85, duration: 0.9, ease: 'power1.inOut' },
      2.0
    );

    // 3. Logo layers reveal: Camera body + CANDID outline + PIXEL masked rise + twinkling dots + STUDIOS letter-spacing
    tl.fromTo('.' + styles.logoBaseWrapper,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' },
      1.8
    );

    // Twinkling halftone dots over IX
    tl.fromTo('.' + styles.halftoneDotGroup + ' circle',
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, stagger: { amount: 0.5, from: 'random' }, duration: 0.4, ease: 'back.out(2)' },
      2.4
    );

    // Tracked small caps expansion for STUDIOS
    tl.fromTo('.' + styles.studiosGhost,
      { letterSpacing: '0.1em', opacity: 0 },
      { letterSpacing: '0.65em', opacity: 1, duration: 1.1, ease: 'power2.out' },
      2.5
    );

    // 4. Soft shutter flash & Aperture Iris Wipe
    tl.call(() => playSynthesizedShutterClick(), null, 3.4);
    tl.fromTo('.' + styles.shutterFlash,
      { opacity: 0 },
      { opacity: 0.95, duration: 0.08, yoyo: true, repeat: 1, ease: 'power4.in' },
      3.4
    );

    // Aperture iris blade wipe reveal
    tl.fromTo('.' + styles.irisMask,
      { clipPath: 'circle(0% at 50% 50%)' },
      { clipPath: 'circle(150% at 50% 50%)', duration: 1.1, ease: 'power3.inOut' },
      3.45
    );

    // 5. Shared-element transition: Logo mark flies toward top-left navbar
    tl.to('.' + styles.logoBaseWrapper, {
      x: () => -window.innerWidth * 0.38,
      y: () => -window.innerHeight * 0.41,
      scale: 0.32,
      opacity: 0.9,
      duration: 0.9,
      ease: 'power3.inOut'
    }, 3.8);

    // Fade entire splash out
    tl.to(containerRef.current, {
      opacity: 0,
      pointerEvents: 'none',
      duration: 0.6,
      ease: 'power2.inOut'
    }, 4.2);

  }, { scope: containerRef });

  const handleSkip = () => {
    if (timelineRef.current) {
      timelineRef.current.progress(1);
    }
  };

  return (
    <aside
      ref={containerRef}
      className={styles.splashContainer}
      aria-label="Candid Pixel Studios Title Sequence"
      role="dialog"
      aria-modal="true"
    >
      {/* 1. Film Grain Overlay */}
      <div className={styles.grain}></div>

      {/* 2. Soft Shutter Flash Whiteout Layer */}
      <div className={styles.shutterFlash}></div>

      {/* 3. Iris Wipe Aperture Overlay */}
      <div className={styles.irisMask}></div>

      {/* Central SVG Line & Focus Ring Animation */}
      <svg className={styles.hairlineSvg} viewBox="0 0 100 1000" preserveAspectRatio="none">
        <line
          x1="50"
          y1="0"
          x2="50"
          y2="1000"
          stroke="url(#goldHairlineGrad)"
          strokeWidth="1.5"
          strokeDasharray="1000"
        />
        <defs>
          <linearGradient id="goldHairlineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8E6F2E" stopOpacity="0" />
            <stop offset="25%" stopColor="#C9A24B" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#F5E5B8" stopOpacity="1" />
            <stop offset="75%" stopColor="#C9A24B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8E6F2E" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Central Hero Logo Assembly */}
      <div className={styles.centerStage}>
        {/* Navy Atmospheric Glow */}
        <div className={styles.cameraBodyGlow}></div>

        {/* Shimmer Sweep Ray */}
        <div className={styles.shimmerSweep}></div>

        {/* Concentric Focus Rings Overlay */}
        <svg className={styles.focusRingsSvg} viewBox="0 0 400 400">
          <defs>
            <linearGradient id="ringGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E6C877" />
              <stop offset="50%" stopColor="#8E6F2E" />
              <stop offset="100%" stopColor="#F5E5B8" />
            </linearGradient>
          </defs>
          <circle
            className={styles.lensRingOuter}
            cx="140"
            cy="200"
            r="72"
            fill="none"
            stroke="url(#ringGold)"
            strokeWidth="1.5"
            strokeDasharray="600"
          />
          <circle
            className={styles.lensRingInner}
            cx="140"
            cy="200"
            r="48"
            fill="none"
            stroke="url(#ringGold)"
            strokeWidth="1.2"
            strokeDasharray="400"
          />

          {/* Twinkling Halftone Dots Over IX Coordinate */}
          <g className={styles.halftoneDotGroup}>
            <circle cx="280" cy="190" r="2.4" fill="#E6C877" />
            <circle cx="288" cy="194" r="2.8" fill="#F5E5B8" />
            <circle cx="296" cy="190" r="2.4" fill="#C9A24B" />
            <circle cx="284" cy="202" r="2.6" fill="#F5E5B8" />
            <circle cx="292" cy="202" r="2.2" fill="#E6C877" />
            <circle cx="288" cy="210" r="2.5" fill="#C9A24B" />
            <circle cx="298" cy="204" r="2.0" fill="#F5E5B8" />
          </g>
        </svg>

        {/* THE OFFICIAL LOGO HERO IMAGE - screen blended on black background */}
        <div className={styles.logoBaseWrapper}>
          <img
            src="/assets/logo.png"
            alt="Candid Pixel Studios"
            className={styles.logoImg}
            onError={(e) => {
              // Graceful fallback to JPEG if PNG is missing
              if (!e.currentTarget.src.endsWith('.jpeg')) {
                e.currentTarget.src = '/assets/logo.jpeg';
              }
            }}
          />
        </div>

        {/* Tracked STUDIOS Typography Accent */}
        <div className={styles.studiosGhost}>S T U D I O S</div>
      </div>

      {/* Progress Footer: Counter, Line, Skip */}
      <div className={styles.progressTray}>
        <div className={styles.counterRow}>
          <span className={styles.counterCode}>LENS CALIBRATION</span>
          <span className={styles.counterDigits}>{counter.toString().padStart(3, '0')}%</span>
        </div>
        <div className={styles.progressLineTrack}>
          <div className={styles.progressLineFill} style={{ width: `${counter}%` }}></div>
        </div>
      </div>

      <button
        onClick={handleSkip}
        className={styles.skipBtn}
        aria-label="Skip splash introduction"
      >
        <span>SKIP SEQUENCE</span>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </aside>
  );
}
