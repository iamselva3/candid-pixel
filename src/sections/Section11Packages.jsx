import React, { useState } from 'react';
import { content } from '../content/content';
import Magnetic from '../components/Magnetic';
import { getLenis } from '../hooks/useLenis';
import styles from '../styles/Section11Packages.module.css';

export default function Section11Packages() {
  const [activeTier, setActiveTier] = useState(1); // 1 is recommended 'Imperial Anamorphic'

  const handleRequestQuote = (packageName) => {
    const el = document.getElementById('booking');
    if (!el) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, { duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="packages" className={styles.packagesSection} aria-label="Curated Commissions and Investment">
      <div className={styles.packagesWrapper}>
        <div className={styles.sectionHeader}>
          <div className={styles.badgeRow}>
            <span className={styles.indexNum}>11</span>
            <span className={styles.badgeText}>INVESTMENT &bull; ATELIER COMMISSIONS</span>
          </div>
          <h2 className={styles.title}>Bespoke Legacy Editions</h2>
          <p className={styles.subtitle}>
            We do not sell hours. We dedicate entire creative cohorts to preserve your celebration without compromise.
          </p>
        </div>

        {/* Overlapping Morphing Layers Deck */}
        <div className={styles.tierCardsContainer}>
          {content.packages.map((pkg, idx) => {
            const isActive = idx === activeTier;
            return (
              <div
                key={pkg.id}
                onClick={() => setActiveTier(idx)}
                className={`${styles.packageLayerCard} ${isActive ? styles.layerActive : ''} ${pkg.recommended ? styles.recommendedBorder : ''}`}
              >
                <div className={styles.cardTop}>
                  <span className={styles.tierBadge}>{pkg.badge}</span>
                  <span className={styles.tierDays}>{pkg.days}</span>
                </div>

                <div className={styles.titleBlock}>
                  <h3 className={styles.tierTitle}>{pkg.title}</h3>
                  <p className={styles.tierTagline}>{pkg.tagline}</p>
                </div>

                <div className={styles.goldDivider}></div>

                <ul className={styles.inclusionList}>
                  {pkg.inclusions.map((item, i) => (
                    <li key={i} className={styles.inclusionItem}>
                      <span className={styles.checkIcon}>&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.cardBottom}>
                  <span className={styles.priceGuide}>{pkg.priceGuide}</span>

                  <Magnetic strength={0.4}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRequestQuote(pkg.title);
                      }}
                      className={styles.requestBtn}
                      data-cursor="view"
                      aria-label={`Request consultation for ${pkg.title}`}
                    >
                      <span>REQUEST COMMISSION</span>
                      <span className={styles.btnArrow}>&rarr;</span>
                    </button>
                  </Magnetic>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
