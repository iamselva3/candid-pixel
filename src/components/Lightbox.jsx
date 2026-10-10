import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/Lightbox.module.css';

export default function Lightbox({ isOpen, images, currentIndex, onClose, onPrev, onNext }) {
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [isOpen, onClose, onPrev, onNext]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen || !images.length) return null;

  const currentImg = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        className={styles.lightboxBackdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label="Image Lightbox"
      >
        {/* Top Header: Counter & Close */}
        <div className={styles.lightboxHeader}>
          <div className={styles.headerInfo}>
            <span className={styles.frameTag}>{currentImg.frame || `FRAME-${currentIndex + 1}`}</span>
            <span className={styles.frameCaption}>{currentImg.caption}</span>
          </div>

          <div className={styles.counterBox}>
            <span>{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className={styles.slash}>/</span>
            <span>{String(images.length).padStart(2, '0')}</span>
          </div>

          <button onClick={onClose} className={styles.closeBtn} aria-label="Close Lightbox">
            <span>CLOSE</span>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Center Main Stage Image */}
        <div className={styles.imageStage}>
          <button onClick={onPrev} className={`${styles.navBtn} ${styles.prevBtn}`} aria-label="Previous Image">
            &larr;
          </button>

          <motion.div
            key={currentImg.id || currentIndex}
            className={styles.imageWrapper}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <img src={currentImg.url} alt={currentImg.caption} className={styles.activeLightboxImg} />
          </motion.div>

          <button onClick={onNext} className={`${styles.navBtn} ${styles.nextBtn}`} aria-label="Next Image">
            &rarr;
          </button>
        </div>

        {/* Keyboard Helper Footer */}
        <div className={styles.keyboardHelper}>
          <span>USE [ARROW KEYS] TO NAVIGATE &bull; [ESC] TO DISMISS</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
