import React, { useEffect, useRef } from 'react';

/**
 * Drifting gold dust behind a section: soft glowing specks that rise, sway and twinkle.
 * Runs only while the section is on screen, and not at all with reduced motion.
 */
export default function GoldDust({ density = 1, className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    // One pre-rendered glowing speck, drawn scaled for every particle (cheaper than shadowBlur).
    const sprite = document.createElement('canvas');
    sprite.width = sprite.height = 64;
    const sctx = sprite.getContext('2d');
    const g = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(245, 229, 184, 1)');
    g.addColorStop(0.18, 'rgba(230, 200, 119, 0.85)');
    g.addColorStop(0.45, 'rgba(201, 162, 75, 0.25)');
    g.addColorStop(1, 'rgba(201, 162, 75, 0)');
    sctx.fillStyle = g;
    sctx.fillRect(0, 0, 64, 64);

    let w = 0;
    let h = 0;
    let particles = [];
    let raf = 0;
    let visible = false;

    const spawn = (anywhere) => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 20,
      r: 0.6 + Math.random() * Math.random() * 3.2,
      vy: 6 + Math.random() * 16, // px per second, upward
      sway: 8 + Math.random() * 22,
      phase: Math.random() * Math.PI * 2,
      twinkle: 0.6 + Math.random() * 1.8,
      depth: 0.4 + Math.random() * 0.6,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(140, ((w * h) / 13000) * density));
      particles = Array.from({ length: count }, () => spawn(true));
      if (reduced) draw(0);
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        const glow = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * p.twinkle + p.phase));
        const size = p.r * 7 * p.depth;
        const x = p.x + Math.sin(t * 0.4 + p.phase) * p.sway;
        ctx.globalAlpha = glow * p.depth;
        ctx.drawImage(sprite, x - size / 2, p.y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
    };

    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.vy * p.depth * dt;
        if (p.y < -20) particles[i] = spawn(false);
      }
      draw(now / 1000);
      raf = visible ? requestAnimationFrame(tick) : 0;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    if (reduced) return () => ro.disconnect();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}
