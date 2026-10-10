const fs = require('fs');
const path = require('path');

const dirs = [
  'src/components',
  'src/sections',
  'src/hooks',
  'src/styles'
];

dirs.forEach(d => fs.mkdirSync(path.join(__dirname, d), { recursive: true }));

// 1. Hooks
fs.writeFileSync('src/hooks/useLenis.js', `
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0, 0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return lenisRef;
}
`);

// 2. Components
fs.writeFileSync('src/components/Splash.jsx', `
import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from '../styles/Splash.module.css';

export default function Splash({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const container = useRef();

  useGSAP(() => {
    document.body.style.overflow = 'hidden';
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = 'auto';
        onComplete();
      }
    });

    const progressObj = { val: 0 };
    tl.to(progressObj, {
      val: 100, duration: 2.5, ease: 'power1.inOut',
      onUpdate: () => setProgress(Math.floor(progressObj.val))
    }, 0);

    tl.to('.' + styles.splashLine, { height: '100%', duration: 1.5, ease: 'power2.inOut' }, 0)
      .to('.' + styles.splashLogo, { opacity: 1, duration: 1 }, 1)
      .to(container.current, { opacity: 0, duration: 0.8, delay: 0.5 });
  }, { scope: container });

  return (
    <div className={styles.splash} ref={container}>
      <div className={styles.splashGrain}></div>
      <div className={styles.splashLine}></div>
      <div className={styles.splashContent}>
        <div className={styles.splashLogo}>
          <img src="/assets/logo.jpeg" alt="Logo" className={styles.logoImg} />
          <div className={styles.logoText}>
            <span className={styles.candid}>CANDID</span>
            <span className={styles.pixel}>PIXEL</span>
            <span className={styles.studios}>STUDIOS</span>
          </div>
        </div>
      </div>
      <div className={styles.splashProgress}>
        <span className={styles.progressLine}></span>
        <span className={styles.progressCount}>{progress.toString().padStart(3, '0')}</span>
      </div>
      <button className={styles.splashSkip} onClick={onComplete}>SKIP</button>
    </div>
  );
}
`);
fs.writeFileSync('src/styles/Splash.module.css', `
.splash { position: fixed; inset: 0; background: var(--base-black-1); z-index: 10000; display: flex; align-items: center; justify-content: center; }
.splashLine { position: absolute; top: 0; left: 50%; width: 1px; height: 0; background: var(--gold-2); }
.splashLogo { display: flex; align-items: center; gap: 2rem; opacity: 0; }
.logoImg { width: 100px; height: 100px; mix-blend-mode: screen; }
.logoText { display: flex; flex-direction: column; }
.candid { font-family: var(--font-serif); font-size: 3rem; -webkit-text-stroke: 1px var(--deep-navy-3); color: transparent; }
.pixel { font-family: var(--font-serif); font-size: 3rem; color: var(--deep-navy-3); }
.studios { font-family: var(--font-sans); font-size: 0.8rem; letter-spacing: 15px; color: var(--gold-2); }
.splashProgress { position: absolute; bottom: 10%; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
.progressLine { width: 0px; height: 1px; background: var(--gold-2); }
.progressCount { font-size: 0.8rem; letter-spacing: 5px; color: var(--text-ivory); }
.splashSkip { position: absolute; bottom: 10%; right: 5%; background: none; border: none; color: var(--text-muted); cursor: pointer; z-index: 10001; }
`);

fs.writeFileSync('src/App.jsx', `
import React, { useState, useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import Splash from './components/Splash';
import Section01Hero from './sections/Section01Hero';
import Section02Marquee from './sections/Section02Marquee';

function App() {
  const lenisRef = useLenis();
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('splashPlayed')) {
      setSplashDone(true);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem('splashPlayed', 'true');
    setSplashDone(true);
  };

  return (
    <>
      {!splashDone && <Splash onComplete={handleSplashComplete} />}
      {splashDone && (
        <main>
          <Section01Hero />
          <Section02Marquee />
          {/* Render other sections similarly */}
        </main>
      )}
    </>
  );
}
export default App;
`);

fs.writeFileSync('src/sections/Section01Hero.jsx', `
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { config } from '../content/content';
import styles from '../styles/Section01Hero.module.css';

export default function Section01Hero() {
  const container = useRef();
  
  useGSAP(() => {
    gsap.fromTo('.' + styles.heroCandid, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.5, ease: "expo.out" });
    gsap.fromTo('.' + styles.heroPixel, { opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1, duration: 1.5, delay: 0.2, ease: "expo.out" });
  }, { scope: container });

  return (
    <section ref={container} className={styles.heroSection}>
      <div className={styles.heroImages}>
        <img src={config.images.hero[0]} className={styles.heroImg} alt="Hero" />
      </div>
      <div className={styles.heroTitles}>
        <h1 className={styles.heroCandid}>CANDID</h1>
        <h1 className={styles.heroPixel}>PIXEL</h1>
      </div>
    </section>
  );
}
`);
fs.writeFileSync('src/styles/Section01Hero.module.css', `
.heroSection { display: flex; align-items: center; justify-content: center; position: relative; width: 100vw; height: 100vh; overflow: hidden; background: var(--base-black-1); }
.heroImages { position: absolute; inset: 0; }
.heroImg { width: 100%; height: 100%; object-fit: cover; opacity: 0.6; }
.heroTitles { position: relative; z-index: 11; text-align: center; }
.heroCandid { font-size: clamp(4rem, 12vw, 12rem); -webkit-text-stroke: 2px var(--text-ivory); color: transparent; font-family: var(--font-serif); }
.heroPixel { font-size: clamp(4rem, 12vw, 12rem); background: var(--gold-gradient); -webkit-background-clip: text; color: transparent; font-family: var(--font-serif); margin-top: -5%; }
`);

fs.writeFileSync('src/sections/Section02Marquee.jsx', `
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from '../styles/Section02Marquee.module.css';

export default function Section02Marquee() {
  const container = useRef();

  useGSAP(() => {
    gsap.to('.' + styles.track, {
      xPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5
      }
    });
  }, { scope: container });

  const services = ["Candid Wedding", "Cinematography", "Pre-Wedding", "Luxury Events"];

  return (
    <section ref={container} className={styles.marqueeSection}>
      <div className={styles.track}>
        {[...Array(4)].map((_, i) => (
          services.map((s, idx) => (
            <React.Fragment key={i + '-' + idx}>
              <div className={i % 2 === 0 ? styles.itemOutline : styles.item}>{s}</div>
              <div className={styles.icon}></div>
            </React.Fragment>
          ))
        ))}
      </div>
    </section>
  );
}
`);
fs.writeFileSync('src/styles/Section02Marquee.module.css', `
.marqueeSection { min-height: 20vh; display: flex; align-items: center; background: var(--deep-navy-1); overflow: hidden; }
.track { display: flex; white-space: nowrap; font-family: var(--font-serif); font-size: clamp(2rem, 5vw, 5rem); text-transform: uppercase; font-style: italic; }
.item, .itemOutline { display: inline-flex; align-items: center; padding: 0 2rem; color: var(--text-ivory); }
.itemOutline { -webkit-text-stroke: 1px var(--text-ivory); color: transparent; }
.icon { width: 20px; height: 20px; background: var(--gold-2); border-radius: 50%; margin: 0 2rem; display: inline-block; }
`);
