import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../content/content';
import styles from '../styles/Section10Quotes.module.css';

export default function Section10Quotes() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const quotes = content.quotes;

  const nextQuote = () => {
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  const current = quotes[currentIndex];

  return (
    <section id="quotes" className={styles.quotesSection} aria-label="Moments Quote Wall" data-cursor="drag">
      <div className={styles.quotesWrapper}>
        <div className={styles.sectionHeader}>
          <div className={styles.badgeRow}>
            <span className={styles.indexNum}>10</span>
            <span className={styles.badgeText}>ECHOES &bull; PATRON TESTIMONIALS</span>
          </div>
          <span className={styles.dragPrompt}>[ DRAGGABLE QUOTE WALL ]</span>
        </div>

        {/* Huge Animated Quote Display */}
        <div className={styles.quoteCardContainer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={styles.quoteCard}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset }) => {
                if (offset.x < -40) nextQuote();
                else if (offset.x > 40) prevQuote();
              }}
            >
              <div className={styles.quoteMarks}>&ldquo;</div>

              <blockquote className={styles.quoteEnglish}>
                {current.quote}
              </blockquote>

              {/* Star Rating in Brushed Gold */}
              <div className={styles.starsRow} aria-label="5 Star Rating">
                {[...Array(current.stars || 5)].map((_, i) => (
                  <span key={i} className={styles.starGlyph}>&#9733;</span>
                ))}
              </div>

              {/* Author Info & Photo */}
              <div className={styles.authorRow}>
                <div className={styles.authorAvatarBox}>
                  <img src={current.photo} alt={current.author} className={styles.authorAvatar} />
                  <div className={styles.avatarGoldRing}></div>
                </div>

                <div className={styles.authorMeta}>
                  <span className={styles.authorName}>{current.author}</span>
                  <span className={styles.authorRole}>{current.role} &bull; {current.date}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Progress Controls */}
        <div className={styles.sliderControls}>
          <button onClick={prevQuote} className={styles.navArrow} aria-label="Previous quote">
            &larr; PREVIOUS
          </button>

          <div className={styles.sliderDots}>
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`${styles.dotBtn} ${i === currentIndex ? styles.activeDot : ''}`}
                aria-label={`Go to quote ${i + 1}`}
              />
            ))}
          </div>

          <button onClick={nextQuote} className={styles.navArrow} aria-label="Next quote">
            NEXT &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
