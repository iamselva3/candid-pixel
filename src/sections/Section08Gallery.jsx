import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { content } from '../content/content';
import Lightbox from '../components/Lightbox';
import styles from '../styles/Section08Gallery.module.css';

gsap.registerPlugin(ScrollTrigger);

const TABS = [
  { key: 'wedding', label: 'CANDID WEDDING' },
  { key: 'prewedding', label: 'PRE-WEDDING' },
  { key: 'baby', label: 'BABY & MATERNITY' },
  { key: 'events', label: 'ROYAL EVENTS' },
];

export default function Section08Gallery() {
  const [activeTab, setActiveTab] = useState('wedding');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const containerRef = useRef(null);

  const currentImages = content.gallery[activeTab] || [];

  useGSAP(() => {
    // Clip-path reveal on entry for contact sheet frames
    gsap.fromTo('.' + styles.contactFrame,
      { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0, y: 30 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, { scope: containerRef, dependencies: [activeTab] });

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  return (
    <section ref={containerRef} id="gallery" className={styles.gallerySection} aria-label="Curated Contact Sheet Gallery">
      {/* Gallery Header & Filter Tabs */}
      <div className={styles.galleryHeader}>
        <div className={styles.headerTitleCol}>
          <div className={styles.badgeRow}>
            <span className={styles.indexNum}>08</span>
            <span className={styles.badgeText}>THE ARCHIVAL CONTACT SHEET</span>
          </div>
          <h2 className={styles.title}>Proof of Emotion</h2>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterTabs} role="tablist">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.key)}
                className={`${styles.filterBtn} ${isActive ? styles.activeTab : ''}`}
              >
                <span>{tab.label}</span>
                {isActive && <span className={styles.activePillDot}></span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Photographer's Contact Sheet Bento Grid */}
      <div className={styles.contactSheetGrid}>
        {currentImages.map((img, i) => (
          <div
            key={img.id}
            onClick={() => openLightbox(i)}
            className={styles.contactFrame}
            data-cursor="view"
          >
            {/* Contact Sheet Edge Sprocket & Tick Marks */}
            <div className={styles.sheetHeader}>
              <span className={styles.sheetFrameNum}>{img.frame || `FR-0${i + 1}A`}</span>
              <span className={styles.sheetTick}>&bull; &bull; &bull;</span>
              <span className={styles.sheetStock}>KODAK PORTRA 400</span>
            </div>

            <div className={styles.frameImgBox} style={{ aspectRatio: img.aspect || '4/5' }}>
              <img src={img.url} alt={img.caption} className={styles.sheetImg} loading="lazy" />
              <div className={styles.hoverZoomLens}>
                <span className={styles.zoomText}>VIEW FRAME &rarr;</span>
              </div>
            </div>

            <div className={styles.sheetFooter}>
              <span className={styles.captionText}>{img.caption}</span>
              <span className={styles.isoText}>ISO 100</span>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Fullscreen Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        images={currentImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </section>
  );
}
