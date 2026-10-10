import React, { useState, useEffect, useRef } from 'react';
import Magnetic from './Magnetic';
import styles from '../styles/Navbar.module.css';

export default function Navbar({ onOpenMenu, isMenuOpen }) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Don't hide navbar if menu is currently open
      if (isMenuOpen) {
        setHidden(false);
        return;
      }

      if (currentScrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`${styles.navbar} ${hidden ? styles.hidden : ''} ${scrolled ? styles.scrolled : ''}`}
      role="banner"
    >
      <div className={styles.navContainer}>
        {/* Brand Logo Mark */}
        <a
          href="#hero"
          onClick={scrollToTop}
          className={styles.brandLink}
          aria-label="Candid Pixel Studios Home"
        >
          <img
            src="/assets/logo.png"
            alt="Candid Pixel Studios"
            className={styles.logoMark}
          />
        </a>



        {/* Magnetic Round Menu Button */}
        <Magnetic strength={0.4}>
          <button
            onClick={onOpenMenu}
            className={`${styles.menuButton} ${isMenuOpen ? styles.active : ''}`}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMenuOpen}
          >
            <div className={styles.menuCircle}>
              <span className={styles.menuDot}></span>
              <span className={styles.menuText}>{isMenuOpen ? 'CLOSE' : 'MENU'}</span>
            </div>
          </button>
        </Magnetic>
      </div>

      {/* Gold Active Underline */}
      <div className={styles.goldNavBorder}></div>
    </header>
  );
}
