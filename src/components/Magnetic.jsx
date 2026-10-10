import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Magnetic({ children, strength = 0.35, active = true }) {
  const magneticRef = useRef(null);

  useEffect(() => {
    const el = magneticRef.current;
    if (!el || !active) return;

    // Skip on touch / coarse devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      xTo(deltaX);
      yTo(deltaY);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(el);
    };
  }, [strength, active]);

  return (
    <div ref={magneticRef} style={{ display: 'inline-block' }}>
      {children}
    </div>
  );
}
