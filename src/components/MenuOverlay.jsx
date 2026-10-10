import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../content/content';
import { getLenis } from '../hooks/useLenis';
import styles from '../styles/MenuOverlay.module.css';

const MENU_ITEMS = [
  { label: '01. Viewfinder', target: 'hero', image: content.hero[0].url },
  { label: '02. The Atelier', target: 'manifesto', image: content.about.leadImage },
  { label: '03. Heritage Story', target: 'about', image: content.about.secondaryImage },
  { label: '04. Disciplines', target: 'specialities', image: content.services[0].image },
  { label: '05. Selected Works', target: 'featured', image: content.featured[0].url },
  { label: '06. Cinema Showreel', target: 'films', image: content.films.heroShowreel.poster },
  { label: '07. Contact Sheet', target: 'gallery', image: content.gallery.wedding[0].url },
  { label: '08. The Process', target: 'process', image: content.services[1].image },
  { label: '09. Commissions', target: 'packages', image: content.featured[1].url },
  { label: '10. Reserve Dates', target: 'booking', image: content.hero[1].url },
];

export default function MenuOverlay({ isOpen, onClose }) {
  const [activePreview, setActivePreview] = useState(MENU_ITEMS[0].image);

  const handleLinkClick = (targetId) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(el, { duration: 1.4 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 350);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
          animate={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          exit={{ opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
          transition={{ duration: 0.65, ease: [0.19, 1, 0.22, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          {/* Subtle Ambient Grain Layer */}
          <div className={styles.grainOverlay}></div>

          {/* Close Button Header */}
          <div className={styles.overlayHeader}>
            <span className={styles.studioCode}>CANDID PIXEL &bull; INDEX</span>
            <button onClick={onClose} className={styles.closeBtn} aria-label="Close navigation">
              <span>CLOSE</span>
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className={styles.splitContent}>
            {/* Left Column: Big Staggered Editorial Links */}
            <nav className={styles.linksColumn} aria-label="Main Navigation Links">
              <ul className={styles.linksList}>
                {MENU_ITEMS.map((item, idx) => (
                  <motion.li
                    key={item.target}
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 + idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    className={styles.linkItem}
                  >
                    <button
                      onClick={() => handleLinkClick(item.target)}
                      onMouseEnter={() => setActivePreview(item.image)}
                      className={styles.linkButton}
                      data-cursor="view"
                    >
                      <span className={styles.linkLabel}>{item.label}</span>
                      <span className={styles.linkArrow}>&rarr;</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Right Column (Desktop): Dynamic Image Preview & Concierge Info */}
            <div className={styles.previewColumn}>
              <div className={styles.previewFrame}>
                <motion.img
                  key={activePreview}
                  src={activePreview}
                  alt="Gallery Preview"
                  className={styles.previewImage}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
                <div className={styles.previewVignette}></div>
              </div>

              {/* Concierge & Contact Block */}
              <div className={styles.conciergeBlock}>
                <div className={styles.contactItem}>
                  <span className={styles.metaLabel}>COMMISSIONS & ENQUIRIES</span>
                  <a href={`mailto:${content.studio.email}`} className={styles.metaValue}>
                    {content.studio.email}
                  </a>
                  <a href={`tel:${content.studio.phone}`} className={styles.metaValue}>
                    {content.studio.phoneDisplay}
                  </a>
                </div>

                <div className={styles.contactItem}>
                  <span className={styles.metaLabel}>ATELIER LOCATION</span>
                  <p className={styles.metaValue}>{content.studio.address}</p>
                </div>

                <div className={styles.socialRow}>
                  <a href={content.studio.instagramUrl} target="_blank" rel="noopener noreferrer">
                    INSTAGRAM
                  </a>
                  <span className={styles.dotSeparator}>&bull;</span>
                  <a href={content.studio.whatsappUrl} target="_blank" rel="noopener noreferrer">
                    WHATSAPP
                  </a>
                  <span className={styles.dotSeparator}>&bull;</span>
                  <a href={content.studio.youtubeUrl} target="_blank" rel="noopener noreferrer">
                    CINEMA CHANNEL
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
