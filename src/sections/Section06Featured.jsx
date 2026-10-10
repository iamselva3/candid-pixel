import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { content } from '../content/content';
import styles from '../styles/Section06Featured.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Section06Featured() {
  const pinWrapperRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    // Mobile check: don't horizontal pin on small touch screens
    const mm = gsap.matchMedia();

    mm.add('(min-width: 901px)', () => {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 120);

      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: pinWrapperRef.current,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    });

    return () => mm.revert();
  }, { scope: pinWrapperRef });

  return (
    <section ref={pinWrapperRef} id="featured" className={styles.featuredSection} aria-label="Featured Works">
      <div className={styles.stickyContainer}>
        <div className={styles.sectionHeader}>
          <div className={styles.headerIndexBadge}>
            <span className={styles.indexNum}>06</span>
            <span className={styles.indexTitle}>CURATED DESTINATIONS &bull; SELECTED WORKS</span>
          </div>
          <span className={styles.dragPrompt}>[ HORIZONTAL PINNED GALLERY &rarr; ]</span>
        </div>

        <div ref={trackRef} className={styles.horizontalTrack} data-cursor="drag">
          {content.featured.map((item) => (
            <div key={item.id} className={styles.projectCard}>
              <div className={styles.cardFrame}>
                <img
                  src={item.url}
                  alt={item.title}
                  className={styles.projectImage}
                  loading="lazy"
                />
                <div className={styles.imageVignette}></div>
                <div className={styles.frameBadge}>
                  <span className={styles.frameCategory}>{item.category}</span>
                  <span className={styles.frameDate}>{item.date}</span>
                </div>
              </div>

              <div className={styles.projectMeta}>
                <div className={styles.metaMain}>
                  <span className={styles.projectNumber}>{item.number}</span>
                  <div>
                    <h3 className={styles.projectTitle}>{item.title}</h3>
                    <p className={styles.projectCoupleLocation}>
                      {item.couple} &mdash; <span className={styles.locHighlight}>{item.location}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
