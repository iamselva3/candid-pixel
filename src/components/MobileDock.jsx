import React from 'react';
import { content } from '../content/content';
import { getLenis } from '../hooks/useLenis';
import styles from '../styles/MobileDock.module.css';

export default function MobileDock() {
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, { duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.dockWrapper} aria-label="Mobile Quick Navigation Dock">
      <div className={styles.dockPill}>
        <button
          onClick={() => handleScrollTo('featured')}
          className={styles.dockItem}
          aria-label="View Selected Work"
        >
          <span className={styles.dockIcon}>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </span>
          <span className={styles.dockLabel}>WORK</span>
        </button>

        <button
          onClick={() => handleScrollTo('films')}
          className={styles.dockItem}
          aria-label="View Cinema Films"
        >
          <span className={styles.dockIcon}>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="1.5">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </span>
          <span className={styles.dockLabel}>FILMS</span>
        </button>

        <button
          onClick={() => handleScrollTo('booking')}
          className={styles.dockItem}
          aria-label="Reserve Atelier Dates"
        >
          <span className={styles.dockIcon}>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </span>
          <span className={styles.dockLabel}>BOOK</span>
        </button>

        <a
          href={content.studio.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.dockItem} ${styles.whatsappHighlight}`}
          aria-label="Chat on WhatsApp"
        >
          <span className={styles.dockIcon}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.18-.544-1.897-.788-3.125-2.736-3.218-2.862-.094-.125-.771-1.025-.771-1.956 0-.931.488-1.388.662-1.577.175-.188.381-.235.508-.235.127 0 .254.002.365.008.118.006.275-.045.43.328.157.375.539 1.314.586 1.41.047.095.079.206.016.332-.064.127-.095.206-.191.317-.095.111-.202.248-.288.334-.095.095-.195.198-.084.389.111.19.493.813 1.059 1.317.728.647 1.341.848 1.532.943.19.095.302.079.413-.048.111-.127.476-.556.603-.746.127-.19.254-.158.428-.095.175.063 1.111.524 1.302.619.19.095.317.143.365.222.048.079.048.46-.096.865z" />
            </svg>
          </span>
          <span className={styles.dockLabel}>WHATSAPP</span>
        </a>
      </div>
    </nav>
  );
}
