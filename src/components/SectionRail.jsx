import React, { useState, useEffect } from 'react';
import { getLenis } from '../hooks/useLenis';
import styles from '../styles/SectionRail.module.css';

const SECTIONS = [
  { num: '01', id: 'hero', name: 'Viewfinder' },
  { num: '02', id: 'marquee', name: 'Atelier' },
  { num: '03', id: 'manifesto', name: 'Manifesto' },
  { num: '04', id: 'about', name: 'Legacy' },
  { num: '05', id: 'specialities', name: 'Disciplines' },
  { num: '06', id: 'featured', name: 'Selected Works' },
  { num: '07', id: 'films', name: 'Showreel' },
  { num: '08', id: 'gallery', name: 'Contact Sheet' },
  { num: '09', id: 'process', name: 'Aperture Path' },
  { num: '10', id: 'quotes', name: 'Resonance' },
  { num: '11', id: 'packages', name: 'Commissions' },
  { num: '12', id: 'team', name: 'Visionaries' },
  { num: '13', id: 'reels', name: 'Living Frames' },
  { num: '14', id: 'faq', name: 'Inquiries' },
  { num: '15', id: 'booking', name: 'Reserve Dates' },
  { num: '16', id: 'footer', name: 'Colophon' },
];

export default function SectionRail() {
  const [activeSection, setActiveSection] = useState('01');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].num);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className={styles.railContainer} aria-label="Section Navigation Progress">
      <div className={styles.railTrack}>
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.num;
          return (
            <button
              key={sec.num}
              onClick={() => handleNavClick(sec.id)}
              className={`${styles.railItem} ${isActive ? styles.active : ''}`}
              aria-label={`Jump to section ${sec.num}: ${sec.name}`}
            >
              <span className={styles.railLine}></span>
              <span className={styles.railNumber}>{sec.num}</span>
              <span className={styles.railTooltip}>{sec.name}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
