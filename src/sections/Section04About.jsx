import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { content } from '../content/content';
import styles from '../styles/Section04About.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Section04About() {
  const containerRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const [counts, setCounts] = useState(content.stats.map(() => 0));

  useGSAP(() => {
    // Asymmetric parallax on overlapping images
    gsap.to(image1Ref.current, {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to(image2Ref.current, {
      yPercent: 25,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    // Count-up stats animation triggered once
    ScrollTrigger.create({
      trigger: '.' + styles.statsGrid,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        content.stats.forEach((stat, index) => {
          const counterObj = { val: 0 };
          gsap.to(counterObj, {
            val: stat.value,
            duration: 2.2,
            ease: 'power3.out',
            onUpdate: () => {
              setCounts((prev) => {
                const next = [...prev];
                next[index] = Math.floor(counterObj.val);
                return next;
              });
            }
          });
        });
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="about" className={styles.aboutSection} aria-label="About Candid Pixel Studios">
      <div className={styles.aboutGrid}>
        {/* Left Editorial Column */}
        <div className={styles.textCol}>
          <div className={styles.sectionBadge}>
            <span className={styles.badgeIndex}>04</span>
            <span className={styles.badgeLabel}>OUR HERITAGE & VISION</span>
          </div>

          <h2 className={styles.aboutHeading}>
            Light is Our Language. <br />
            <span className={styles.headingItalic}>Legacy is Our Promise.</span>
          </h2>

          <p className={styles.aboutBody}>
            Founded in {content.studio.established} by {content.studio.founder}, Candid Pixel was born out of an aversion to stale, scripted wedding ceremonies. We observe from the periphery with quiet reverence. We believe true romance doesn't need to be directed—it only needs to be witnessed with extraordinary technical mastery.
          </p>

          {/* Metric Counter Row */}
          <div className={styles.statsGrid}>
            {content.stats.map((stat, i) => (
              <div key={stat.code} className={styles.statCard}>
                <span className={styles.statValue}>
                  {counts[i]}
                  <span className={styles.statSuffix}>{stat.suffix}</span>
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
                <span className={styles.statCode}>{stat.code}</span>
              </div>
            ))}
          </div>

          {/* Founder Note & Calligraphic Signature */}
          <div className={styles.founderNote}>
            <p className={styles.founderQuote}>"{content.studio.founderQuote}"</p>
            <div className={styles.signatureRow}>
              <div>
                <span className={styles.founderName}>{content.studio.founder}</span>
                <span className={styles.founderTitle}>{content.studio.founderTitle}</span>
              </div>
              <div className={styles.handwrittenSig}>Karthik S.</div>
            </div>
          </div>
        </div>

        {/* Right Asymmetric Parallax Image Composition */}
        <div className={styles.imageCol}>
          <div ref={image1Ref} className={styles.imageFrameLead}>
            <img
              src={content.about.leadImage}
              alt="Candid Pixel Fine Art Portrait"
              className={styles.aboutImg}
              loading="lazy"
            />
            <div className={styles.imageCaptionBadge}>
              <span>FIG. 04A &bull; CINE ANAMORPHIC</span>
            </div>
          </div>

          <div ref={image2Ref} className={styles.imageFrameSecondary}>
            <img
              src={content.about.secondaryImage}
              alt="Candid Pixel Ceremony Moment"
              className={styles.aboutImg}
              loading="lazy"
            />
            <div className={styles.imageCaptionBadge}>
              <span>FIG. 04B &bull; 85MM ATELIER</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
