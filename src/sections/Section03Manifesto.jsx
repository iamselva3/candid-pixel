import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GoldDust from '../components/GoldDust';
import styles from '../styles/Section03Manifesto.module.css';

gsap.registerPlugin(ScrollTrigger);

// Three short beats, revealed one at a time as the visitor scrolls.
// `strike` gets a gold pen-line through it; `gold` is set in metallic gold; `italic` leans in.
const BEATS = [
  [{ text: 'We don’t' }, { text: 'pose', strike: true }, { text: 'your love.' }],
  [{ text: 'We' }, { text: 'wait', italic: true }, { text: 'for it.' }],
  [{ text: 'Then keep it' }, { text: 'forever.', gold: true }],
];

const CLOSING =
  'In an age of hurried reels and borrowed poses, Candid Pixel stays an old-world atelier — every frame lit with purpose, graded with restraint, and made to outlive the century.';

// Plain words are split into letters for the rise-in; marked words move as one piece.
function Word({ part }) {
  if (part.strike || part.gold || part.italic) {
    return (
      <span className={styles.wordMask}>
        <span
          className={`${styles.unit} ${part.gold ? styles.gold : ''} ${part.italic ? styles.italic : ''} ${
            part.strike ? styles.strikeWord : ''
          }`}
          data-unit
        >
          {part.text}
          {part.strike && <span className={styles.strikeLine} data-strike aria-hidden="true" />}
        </span>
      </span>
    );
  }
  return part.text.split(' ').map((word, i) => (
    <span key={i} className={styles.wordMask}>
      {[...word].map((ch, j) => (
        <span key={j} className={styles.unit} data-unit>
          {ch}
        </span>
      ))}
    </span>
  ));
}

export default function Section03Manifesto() {
  const containerRef = useRef(null);
  const stageRef = useRef(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const beats = gsap.utils.toArray(`.${styles.beat}`);
      const strike = containerRef.current.querySelector('[data-strike]');
      const outro = gsap.utils.toArray(`.${styles.outro}`);
      if (reduced) {
        gsap.set(strike, { scaleX: 1 });
        return;
      }

      gsap.set(beats.map((b) => b.querySelectorAll('[data-unit]')), { yPercent: 115, rotate: 6, opacity: 0 });
      gsap.set(strike, { scaleX: 0 });
      gsap.set(outro, { opacity: 0, y: 30 });

      // The stage stays pinned while the beats play out, driven by scroll.
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 2.2}`,
          pin: stageRef.current,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(`.${styles.progressFill}`, { scaleY: 1, ease: 'none', duration: 10 }, 0);
      beats.forEach((beat, i) => {
        const at = i * 2.8;
        tl.to(beat.querySelectorAll('[data-unit]'), { yPercent: 0, rotate: 0, opacity: 1, duration: 1.4, stagger: 0.035 }, at);
        if (i === 0) tl.to(strike, { scaleX: 1, duration: 1, ease: 'power2.inOut' }, at + 1.5);
        // Earlier beats step back so the newest line holds the eye.
        if (i > 0) tl.to(beats[i - 1], { opacity: 0.22, filter: 'blur(1.5px)', duration: 1 }, at);
      });
      tl.to(beats[1], { opacity: 0.22, filter: 'blur(1.5px)', duration: 1 }, 7.6);
      tl.to(outro, { opacity: 1, y: 0, duration: 1.4, stagger: 0.25 }, 8);
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="manifesto" className={styles.manifestoSection} aria-label="Atelier Manifesto">
      <div ref={stageRef} className={styles.stage}>
        <GoldDust density={0.9} />
        <div className={styles.halo} aria-hidden="true" />

        <div className={styles.manifestoWrapper}>
          <div className={styles.hairlineCol} aria-hidden="true">
            <span className={styles.manifestoIndex}>03</span>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} />
            </div>
          </div>

          <div className={styles.contentCol}>
            <span className={styles.preHeading}>THE PHILOSOPHY OF THE ATELIER</span>

            {/* Letters are split for animation; screen readers get the plain sentences. */}
            <h2 className={styles.beats} aria-label={BEATS.map((b) => b.map((p) => p.text).join(' ')).join(' ')}>
              {BEATS.map((beat, i) => (
                <span key={i} className={styles.beat} aria-hidden="true">
                  {beat.map((part, j) => (
                    <Word key={j} part={part} />
                  ))}
                </span>
              ))}
            </h2>

            <p className={`${styles.closing} ${styles.outro}`}>{CLOSING}</p>

            <div className={`${styles.subMetadata} ${styles.outro}`}>
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
      </div>
    </section>
  );
}
