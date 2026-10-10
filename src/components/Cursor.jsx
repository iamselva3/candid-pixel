import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from '../styles/Cursor.module.css';

export default function Cursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorState, setCursorState] = useState({ text: '', mode: 'default', visible: false });

  useEffect(() => {
    // Hide completely on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = cursorRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    setCursorState((s) => ({ ...s, visible: true }));

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power2.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power2.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    const onMouseMove = (e) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onMouseEnter = () => setCursorState((s) => ({ ...s, visible: true }));
    const onMouseLeave = () => setCursorState((s) => ({ ...s, visible: false }));

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    // Global listener for interactive data attributes: [data-cursor="play"|"drag"|"view"]
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const mode = target.getAttribute('data-cursor');
        const text = target.getAttribute('data-cursor-text') || mode.toUpperCase();
        setCursorState({ text, mode, visible: true });
      } else if (e.target.closest('a, button, [role="button"]')) {
        setCursorState({ text: '', mode: 'hover', visible: true });
      } else {
        setCursorState({ text: '', mode: 'default', visible: true });
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
      gsap.killTweensOf([dot, ring]);
    };
  }, []);

  if (!cursorState.visible) return null;

  return (
    <div className={styles.cursorWrapper} aria-hidden="true">
      {/* Central Gold Dot */}
      <div
        ref={cursorRef}
        className={`${styles.cursorDot} ${styles[cursorState.mode] || ''}`}
      />

      {/* Trailing Physics Ring with dynamic mode expansion */}
      <div
        ref={ringRef}
        className={`${styles.cursorRing} ${styles[cursorState.mode] || ''}`}
      >
        {cursorState.text && (
          <span className={styles.cursorText}>{cursorState.text}</span>
        )}
      </div>
    </div>
  );
}
