import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { content } from '../content/content';
import Magnetic from '../components/Magnetic';
import { getLenis } from '../hooks/useLenis';
import styles from '../styles/Section16Footer.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Section16Footer() {
  const footerRef = useRef(null);
  const giantLogoRef = useRef(null);

  useGSAP(() => {
    // Giant logo rises with gold sheen sweep
    gsap.fromTo(giantLogoRef.current,
      { yPercent: 40, opacity: 0.2 },
      {
        yPercent: 0,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          end: 'bottom bottom',
          scrub: true
        }
      }
    );

    // Sheen sweep across the logo
    gsap.fromTo('.' + styles.goldSheenSweep,
      { xPercent: -120 },
      {
        xPercent: 120,
        ease: 'power2.inOut',
        duration: 2.2,
        repeat: -1,
        repeatDelay: 3
      }
    );
  }, { scope: footerRef });

  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.8 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} id="footer" className={styles.footerSection} aria-label="Studio Footer and Colophon">
      <div className={styles.footerInner}>
        {/* Top Colophon Columns */}
        <div className={styles.topColophon}>
          <div className={styles.studioBio}>
            <img
              src="/assets/logo.png"
              alt="Candid Pixel Logo"
              className={styles.footerSmallLogo}
              onError={(e) => {
                if (!e.currentTarget.src.endsWith('.jpeg')) {
                  e.currentTarget.src = '/assets/logo.jpeg';
                }
              }}
            />
            <p className={styles.bioText}>
              A bespoke photography &amp; cinematography atelier crafting timeless European and heritage Indian heirlooms.
            </p>
          </div>

          <div className={styles.linksColumn}>
            <span className={styles.colHeader}>THE ARCHIVES</span>
            <ul className={styles.navLinksList}>
              <li><a href="#hero">Viewfinder &bull; 01</a></li>
              <li><a href="#about">Heritage Story &bull; 04</a></li>
              <li><a href="#specialities">Craft Disciplines &bull; 05</a></li>
              <li><a href="#featured">Curated Works &bull; 06</a></li>
              <li><a href="#films">Cinema Films &bull; 07</a></li>
              <li><a href="#gallery">Contact Sheet &bull; 08</a></li>
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <span className={styles.colHeader}>INQUIRIES</span>
            <ul className={styles.navLinksList}>
              <li><a href="#process">The Aperture Path &bull; 09</a></li>
              <li><a href="#quotes">Patron Resonance &bull; 10</a></li>
              <li><a href="#packages">Commissions &bull; 11</a></li>
              <li><a href="#team">Visionary Masters &bull; 12</a></li>
              <li><a href="#faq">Clarifications &bull; 14</a></li>
              <li><a href="#booking">Reserve Dates &bull; 15</a></li>
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <span className={styles.colHeader}>CONNECT</span>
            <ul className={styles.socialList}>
              <li><a href={content.studio.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram &rarr;</a></li>
              <li><a href={content.studio.whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp &rarr;</a></li>
              <li><a href={content.studio.youtubeUrl} target="_blank" rel="noopener noreferrer">YouTube Cinema &rarr;</a></li>
              <li><a href={`mailto:${content.studio.email}`}>{content.studio.email}</a></li>
            </ul>
          </div>
        </div>

        {/* GIANT LOGO & WORDMARK WITH GOLD SHEEN SWEEP */}
        <div ref={giantLogoRef} className={styles.giantLogoContainer}>
          <div className={styles.goldSheenSweep}></div>
          <div className={styles.giantLogoImageWrap}>
            <img
              src="/assets/logo.png"
              alt="Candid Pixel Studios Master Wordmark"
              className={styles.giantLogoImage}
              onError={(e) => {
                if (!e.currentTarget.src.endsWith('.jpeg')) {
                  e.currentTarget.src = '/assets/logo.jpeg';
                }
              }}
            />
          </div>
          <span className={styles.studiosTracked}>S T U D I O S</span>
        </div>

        {/* Bottom Colophon Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyText}>
            &copy; {new Date().getFullYear()} {content.studio.name}. All Rights Reserved &bull; Curated in {content.studio.city}
          </p>

          <div className={styles.colophonCenter}>
            <span className={styles.lensBadge}>f/1.4 &bull; 85MM ATELIER</span>
          </div>

          {/* Magnetic Back-To-Top Aperture Button */}
          <Magnetic strength={0.4}>
            <button onClick={scrollToTop} className={styles.backToTopBtn} aria-label="Back to top">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                <circle cx="12" cy="12" r="9" stroke="var(--color-gold-light)" strokeWidth="1.2" />
                <path d="M12 16L12 8M8 11L12 7L16 11" stroke="var(--color-gold-sheen)" strokeWidth="1.5" />
              </svg>
              <span>TOP</span>
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
