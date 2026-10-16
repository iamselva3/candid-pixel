import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { content } from '../content/content';
import GoldDust from '../components/GoldDust';
import styles from '../styles/Section04About.module.css';

gsap.registerPlugin(ScrollTrigger);

const HEADING = [
  { text: 'Light is Our Language.' },
  { text: 'Legacy is Our Promise.', gold: true },
];

const SEAL_TEXT = `CANDID PIXEL STUDIOS • EST. ${content.studio.established} • ${content.studio.city.toUpperCase()} • `;

export default function Section04About() {
  const containerRef = useRef(null);
  const imageColRef = useRef(null);
  const archRef = useRef(null);
  const orbRef = useRef(null);
  const watermarkRef = useRef(null);
  const [counts, setCounts] = useState(content.stats.map(() => 0));

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const q = gsap.utils.selector(containerRef);

      // Count-up stats, once, when they come into view.
      ScrollTrigger.create({
        trigger: q(`.${styles.statsGrid}`)[0],
        start: 'top 85%',
        once: true,
        onEnter: () => {
          content.stats.forEach((stat, index) => {
            const counterObj = { val: reduced ? stat.value : 0 };
            gsap.to(counterObj, {
              val: stat.value,
              duration: reduced ? 0 : 2.2,
              ease: 'power3.out',
              onUpdate: () => {
                setCounts((prev) => {
                  const next = [...prev];
                  next[index] = Math.floor(counterObj.val);
                  return next;
                });
              },
            });
          });
          if (!reduced) gsap.fromTo(q(`.${styles.statBar}`), { scaleX: 0 }, { scaleX: 1, duration: 1.8, ease: 'power3.out', stagger: 0.12 });
        },
      });

      if (reduced) return;

      // Entrance: heading words rise, the arch opens like a curtain while its gold outline draws itself.
      const intro = gsap.timeline({
        defaults: { ease: 'expo.out' },
        scrollTrigger: { trigger: containerRef.current, start: 'top 68%' },
      });
      intro
        .from(q(`.${styles.badgeLabel}, .${styles.badgeIndex}`), { opacity: 0, x: -20, duration: 1, stagger: 0.1 })
        .from(q(`.${styles.headWord}`), { yPercent: 120, rotate: 5, duration: 1.4, stagger: 0.06 }, 0.1)
        .from(q(`.${styles.aboutBody}`), { opacity: 0, y: 30, duration: 1.2 }, 0.6)
        .fromTo(archRef.current, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8, ease: 'expo.inOut' }, 0.2)
        .from(q(`.${styles.archImg}`), { scale: 1.3, duration: 2.4, ease: 'power3.out' }, 0.2)
        .fromTo(q(`.${styles.archOutline} path`), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut' }, 0.5)
        .from(orbRef.current, { scale: 0.4, opacity: 0, rotate: -20, duration: 1.6, ease: 'back.out(1.6)' }, 1.1)
        .from(q(`.${styles.seal}`), { scale: 0, opacity: 0, duration: 1.2, ease: 'back.out(1.8)' }, 1.3);

      gsap.from(q(`.${styles.founderNote}`), {
        opacity: 0,
        y: 50,
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: { trigger: q(`.${styles.founderNote}`)[0], start: 'top 88%' },
      });
      gsap.fromTo(
        q(`.${styles.handwrittenSig}`),
        { clipPath: 'inset(0% 100% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 2.2,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: q(`.${styles.founderNote}`)[0], start: 'top 80%' },
        }
      );

      // Depth while scrolling: arch and orb drift apart, the giant year slides behind.
      const scrub = { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true };
      // Move the arch and its gold outline together.
      gsap.to(q(`.${styles.archWrap}`), { yPercent: -8, ease: 'none', scrollTrigger: scrub });
      gsap.to(orbRef.current, { yPercent: 28, ease: 'none', scrollTrigger: scrub });
      gsap.fromTo(watermarkRef.current, { xPercent: 8 }, { xPercent: -14, ease: 'none', scrollTrigger: scrub });

      // The image composition leans toward the pointer.
      const col = imageColRef.current;
      if (window.matchMedia('(hover: hover)').matches && col) {
        const rx = gsap.quickTo(col, 'rotateX', { duration: 1, ease: 'power3.out' });
        const ry = gsap.quickTo(col, 'rotateY', { duration: 1, ease: 'power3.out' });
        const onMove = (e) => {
          const r = col.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 10);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
        };
        const onLeave = () => {
          rx(0);
          ry(0);
        };
        col.addEventListener('pointermove', onMove);
        col.addEventListener('pointerleave', onLeave);
        return () => {
          col.removeEventListener('pointermove', onMove);
          col.removeEventListener('pointerleave', onLeave);
        };
      }
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="about" className={styles.aboutSection} aria-label="About Candid Pixel Studios">
      <GoldDust density={0.45} />
      <div className={styles.lightBeam} aria-hidden="true" />
      <div ref={watermarkRef} className={styles.watermark} aria-hidden="true">
        {content.studio.established}
      </div>

      <div className={styles.aboutGrid}>
        {/* Story */}
        <div className={styles.textCol}>
          <div className={styles.sectionBadge}>
            <span className={styles.badgeIndex}>04</span>
            <span className={styles.badgeLabel}>OUR HERITAGE & VISION</span>
          </div>

          <h2 className={styles.aboutHeading} aria-label={HEADING.map((l) => l.text).join(' ')}>
            {HEADING.map((line, i) => (
              <span key={i} className={`${styles.headLine} ${line.gold ? styles.headingGold : ''}`} aria-hidden="true">
                {line.text.split(' ').map((word, j) => (
                  <span key={j} className={styles.headMask}>
                    <span className={styles.headWord}>{word}</span>
                  </span>
                ))}
              </span>
            ))}
          </h2>

          <p className={styles.aboutBody}>
            Founded in {content.studio.established} by {content.studio.founder}, Candid Pixel was born out of an aversion to
            stale, scripted wedding ceremonies. We observe from the periphery with quiet reverence. We believe true romance
            doesn't need to be directed—it only needs to be witnessed with extraordinary technical mastery.
          </p>

          <div className={styles.statsGrid}>
            {content.stats.map((stat, i) => (
              <div key={stat.code} className={styles.statCard}>
                <span className={styles.statValue}>
                  {counts[i]}
                  <span className={styles.statSuffix}>{stat.suffix}</span>
                </span>
                <span className={styles.statBarTrack} aria-hidden="true">
                  <span className={styles.statBar} />
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
                <span className={styles.statCode}>{stat.code}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Arched heritage frame */}
        <div className={styles.imageStage}>
          <div ref={imageColRef} className={styles.imageCol}>
            <div className={styles.archWrap}>
              <svg className={styles.archOutline} viewBox="0 0 400 540" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 538 V200 A198 198 0 0 1 398 200 V538 Z" pathLength="1" />
              </svg>
              <div ref={archRef} className={styles.arch}>
                <img
                  src={content.about.leadImage}
                  alt="Candid Pixel Fine Art Portrait"
                  className={styles.archImg}
                  loading="lazy"
                />
                <div className={styles.archSheen} aria-hidden="true" />
              </div>
              <span className={styles.imageCaptionBadge}>FIG. 04A &bull; CINE ANAMORPHIC</span>
            </div>

            <div ref={orbRef} className={styles.orb}>
              <img src={content.about.secondaryImage} alt="Candid Pixel Ceremony Moment" className={styles.orbImg} loading="lazy" />
            </div>

            <div className={styles.seal} aria-hidden="true">
              <svg viewBox="0 0 200 200" className={styles.sealRing}>
                <defs>
                  <path id="cp-seal-circle" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
                </defs>
                <text>
                  <textPath href="#cp-seal-circle" textLength="488" lengthAdjust="spacing">
                    {SEAL_TEXT}
                  </textPath>
                </text>
              </svg>
              <span className={styles.sealCore}>
                <span className={styles.sealYear}>{content.studio.established}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Founder's note */}
      <figure className={styles.founderNote}>
        <span className={styles.quoteMark} aria-hidden="true">
          &ldquo;
        </span>
        <blockquote className={styles.founderQuote}>{content.studio.founderQuote}</blockquote>
        <figcaption className={styles.signatureRow}>
          <div>
            <span className={styles.founderName}>{content.studio.founder}</span>
            <span className={styles.founderTitle}>{content.studio.founderTitle}</span>
          </div>
          <div className={styles.handwrittenSig}>Karthik S.</div>
        </figcaption>
      </figure>
    </section>
  );
}
