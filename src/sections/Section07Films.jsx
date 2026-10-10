import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { content } from '../content/content';
import Magnetic from '../components/Magnetic';
import styles from '../styles/Section07Films.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Section07Films() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useGSAP(() => {
    // Scroll-driven dramatic title reveal & scale
    gsap.fromTo('.' + styles.centerCineTitle,
      { y: 80, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'top 20%',
          scrub: 0.5
        }
      }
    );

    // Filmstrip entrance from bottom
    gsap.fromTo('.' + styles.filmstripRow,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 40%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: containerRef });

  const handlePlayToggle = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleClosePlayer = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const currentPoster = content.films.heroShowreel.poster;

  return (
    <section ref={containerRef} id="films" className={styles.filmsSection} aria-label="Cinematic Wedding Films">
      {/* Background Poster / Stream Layer */}
      <div className={styles.bgMediaStage}>
        <img
          src={currentPoster}
          alt="Showreel Background"
          className={styles.bgPosterImg}
          loading="lazy"
        />
        <div className={styles.bgDarkTint}></div>
        <div className={styles.filmAnamorphicLines}></div>
      </div>

      {/* Main Center Stage with Title & Expanding Play Button */}
      <div className={styles.centerStage}>
        <div className={styles.sectionHeaderBadge}>
          <span className={styles.indexNum}>07</span>
          <span className={styles.badgeText}>CINEMATIC MASTERPIECES &bull; 2.39:1 SCOPE</span>
        </div>

        <div className={styles.centerCineTitle}>
          <h2 className={styles.mainTitle}>The Narrative Films</h2>
          <p className={styles.subTitle}>
            Shot on ARRI Alexa Mini &amp; Anamorphic Glass. Graded for Eternity.
          </p>
        </div>

        {/* Magnetic Expanding Play Button */}
        <Magnetic strength={0.45}>
          <button
            onClick={handlePlayToggle}
            className={styles.playButton}
            data-cursor="play"
            aria-label="Play showreel in cinema lightbox"
          >
            <div className={styles.playPulseRing}></div>
            <div className={styles.playInner}>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="var(--color-black-pure)">
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
            </div>
            <span className={styles.playLabel}>PLAY REEL (03:42)</span>
          </button>
        </Magnetic>
      </div>

      {/* Filmstrip Chapter Thumbnails Footer */}
      <div className={styles.filmstripRow}>
        <div className={styles.filmstripHeader}>
          <span className={styles.filmstripLabel}>SELECT CHAPTER SCENE</span>
          <span className={styles.filmstripSpecs}>DCI 4K MASTER &bull; 24 FPS</span>
        </div>

        <div className={styles.stripTrack}>
          {content.films.chapters.map((ch, idx) => {
            const isActive = idx === activeChapter;
            return (
              <div
                key={ch.id}
                onClick={() => {
                  setActiveChapter(idx);
                  handlePlayToggle();
                }}
                className={`${styles.chapterCard} ${isActive ? styles.chapterActive : ''}`}
              >
                <div className={styles.chapterThumbBox}>
                  <img src={ch.thumb} alt={ch.title} className={styles.chapterThumb} loading="lazy" />
                  <span className={styles.timecodeStamp}>{ch.timecode}</span>
                  <div className={styles.sprocketHolesTop}></div>
                  <div className={styles.sprocketHolesBottom}></div>
                </div>
                <div className={styles.chapterInfo}>
                  <span className={styles.chapterTitle}>{ch.title}</span>
                  <span className={styles.chapterCouple}>{ch.couple} &bull; {ch.location}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expanded Lightbox Video Player */}
      {isPlaying && (
        <div className={styles.videoLightboxOverlay} role="dialog" aria-modal="true">
          <button onClick={handleClosePlayer} className={styles.closeVideoBtn} aria-label="Close cinema player">
            <span>CLOSE THEATER</span>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className={styles.videoPlayerContainer}>
            <video
              ref={videoRef}
              src={content.films.heroShowreel.videoUrl}
              controls
              autoPlay
              playsInline
              className={styles.actualVideo}
            />
          </div>
        </div>
      )}
    </section>
  );
}
