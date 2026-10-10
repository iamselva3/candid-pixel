import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { content } from '../content/content';
import styles from '../styles/Section05Specialities.module.css';

export default function Section05Specialities() {
  const [activeImage, setActiveImage] = useState(content.services[0].image);
  const [isHovering, setIsHovering] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState(null);
  const floatImgRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const el = floatImgRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.killTweensOf(el);
    };
  }, []);

  const handleMouseEnter = (img) => {
    setActiveImage(img);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const toggleMobileRow = (id) => {
    setExpandedMobile(expandedMobile === id ? null : id);
  };

  return (
    <section ref={sectionRef} id="specialities" className={styles.specSection} aria-label="Studio Specialities">
      {/* Floating Desktop Image Follower with Halftone Texture */}
      <div
        ref={floatImgRef}
        className={`${styles.floatingImgContainer} ${isHovering ? styles.visible : ''}`}
        aria-hidden="true"
      >
        <div className={styles.floatingImgInner}>
          <img src={activeImage} alt="Service Preview" className={styles.floatingImg} />
          <div className={styles.halftoneOverlay}></div>
          <div className={styles.floatingVignette}></div>
        </div>
      </div>

      <div className={styles.specHeader}>
        <div className={styles.headerLeft}>
          <span className={styles.headerIndex}>05</span>
          <span className={styles.headerTitle}>OUR DISCIPLINES &amp; CRAFT</span>
        </div>
        <span className={styles.headerMeta}>FINE ART DISCIPLINES &bull; 07 SPECIALITIES</span>
      </div>

      <ul className={styles.specList}>
        {content.services.map((svc) => {
          const isMobileOpen = expandedMobile === svc.id;
          return (
            <li
              key={svc.id}
              className={`${styles.specItem} ${isMobileOpen ? styles.mobileOpen : ''}`}
              onMouseEnter={() => handleMouseEnter(svc.image)}
              onMouseLeave={handleMouseLeave}
              onClick={() => toggleMobileRow(svc.id)}
            >
              <div className={styles.rowMain}>
                <span className={styles.serviceNumber}>{svc.id}</span>
                <h3 className={styles.serviceName}>{svc.name}</h3>
                <span className={styles.serviceArrow}>&rarr;</span>
              </div>

              <div className={styles.specMetaDesktop}>
                <span className={styles.specSpecs}>{svc.specs}</span>
                <span className={styles.specTagline}>{svc.tagline}</span>
              </div>

              {/* Mobile Tap-Expanded Accordion View */}
              {isMobileOpen && (
                <div className={styles.mobileExpandedView}>
                  <img src={svc.image} alt={svc.name} className={styles.mobileImg} loading="lazy" />
                  <p className={styles.mobileTagline}>{svc.tagline}</p>
                  <span className={styles.mobileSpecs}>{svc.specs}</span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
