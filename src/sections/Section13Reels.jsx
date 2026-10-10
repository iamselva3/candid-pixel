import React from 'react';
import { content } from '../content/content';
import styles from '../styles/Section13Reels.module.css';

export default function Section13Reels() {
  const reelItems = [...content.reels, ...content.reels];

  return (
    <section id="reels" className={styles.reelsSection} aria-label="Living Frames Instagram Reels Strip">
      <div className={styles.sectionHeader}>
        <div className={styles.badgeRow}>
          <span className={styles.indexNum}>13</span>
          <span className={styles.badgeText}>VERTICAL SOCIAL FEED &bull; LIVING FRAMES</span>
        </div>
        <a
          href={content.studio.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.instaDirectLink}
        >
          <span>FOLLOW {content.studio.instagram}</span>
          <span className={styles.arrowIcon}>&rarr;</span>
        </a>
      </div>

      {/* Auto-scrolling Row that Pauses on Hover */}
      <div className={styles.marqueeContainer}>
        <div className={styles.fadeLeft}></div>
        <div className={styles.fadeRight}></div>

        <div className={styles.reelScrollTrack}>
          {reelItems.map((reel, idx) => (
            <a
              key={`${reel.id}-${idx}`}
              href={reel.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.reelCard}
            >
              <div className={styles.reelFrame}>
                <img src={reel.thumb} alt={reel.title} className={styles.reelImage} loading="lazy" />
                <div className={styles.reelOverlay}>
                  <div className={styles.playIconSmall}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--color-black-pure)">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <span className={styles.reelViewsBadge}>{reel.views} VIEWS</span>
                </div>
              </div>
              <span className={styles.reelTitleText}>{reel.title}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
