import gsap from 'https://esm.sh/gsap';
import ScrollTrigger from 'https://esm.sh/gsap/ScrollTrigger';
import Lenis from 'https://esm.sh/@studio-freight/lenis';
import { config } from './content.js';

gsap.registerPlugin(ScrollTrigger);

// 1. DOM Elements & State
const state = {
  isMenuOpen: false
};

// 2. Lenis Smooth Scroll Setup
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Integrate Lenis with ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0, 0);

// 3. Populate Content from config
function populateContent() {
  // Hero Images
  const heroContainer = document.querySelector('.hero-images');
  config.images.hero.forEach((url, i) => {
    const img = document.createElement('img');
    img.src = url;
    img.className = `hero-img ${i === 0 ? 'active' : ''}`;
    heroContainer.appendChild(img);
  });

  // Marquee
  const marqueeTrack = document.querySelector('.marquee-track');
  const services = ["Candid Wedding", "Cinematography", "Pre-Wedding", "Luxury Events"];
  // Repeat for infinite effect
  for(let i = 0; i < 4; i++) {
    services.forEach(s => {
      marqueeTrack.innerHTML += `
        <div class="marquee-item ${i%2===0 ? 'outline' : ''}">${s}</div>
        <div class="aperture-icon-sm"></div>
      `;
    });
  }

  // About Stats
  const statsContainer = document.getElementById('about-stats-container');
  statsContainer.innerHTML = `
    <div class="stat-item"><h3>${config.stats.weddings}+</h3><p>Weddings</p></div>
    <div class="stat-item"><h3>${config.stats.years}</h3><p>Years</p></div>
    <div class="stat-item"><h3>${config.stats.films}+</h3><p>Films</p></div>
    <div class="stat-item"><h3>${config.stats.families}+</h3><p>Happy Families</p></div>
  `;

  // About Images
  const aboutImagesContainer = document.querySelector('.about-images');
  config.images.about.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    img.className = 'about-img';
    aboutImagesContainer.appendChild(img);
  });

  // Featured Work
  const featuredTrack = document.getElementById('featured-track');
  config.images.featured.forEach((item, index) => {
    featuredTrack.innerHTML += `
      <div class="featured-item">
        <img src="${item.url}" alt="${item.title}">
        <div class="featured-info">
          <span>${item.title} — ${item.location}</span>
          <span class="featured-num">0${index + 1}</span>
        </div>
      </div>
    `;
  });

  // Films
  const filmStrip = document.getElementById('film-strip');
  const filmsBg = document.querySelector('.films-bg');
  filmsBg.style.backgroundImage = `url(${config.images.films[0].thumb})`;
  config.images.films.forEach(film => {
    filmStrip.innerHTML += `<div class="film-thumb" style="background-image: url(${film.thumb})"></div>`;
  });

  // Gallery Grid
  const galleryGrid = document.getElementById('gallery-grid');
  Object.keys(config.images.gallery).forEach(cat => {
    config.images.gallery[cat].forEach(url => {
      galleryGrid.innerHTML += `
        <div class="gallery-item" data-category="${cat}">
          <img src="${url}" alt="Gallery Image" loading="lazy">
        </div>
      `;
    });
  });

  // Team
  const teamGrid = document.getElementById('team-grid');
  config.images.team.forEach(member => {
    teamGrid.innerHTML += `
      <div class="team-member">
        <img src="${member.url}" alt="${member.name}" loading="lazy">
        <div class="team-info">
          <div class="team-name">${member.name}</div>
          <div class="team-role">${member.role}</div>
        </div>
      </div>
    `;
  });

  // Footer & Contact
  const footerContact = document.getElementById('footer-contact');
  footerContact.innerHTML = `
    <p>${config.client.address}</p>
    <p>${config.client.phone}</p>
    <p>${config.client.email}</p>
  `;
  document.getElementById('menu-contact-info').innerHTML = footerContact.innerHTML;

  // Build Progress Rail
  const sections = document.querySelectorAll('section[data-sec]');
  const rail = document.querySelector('.progress-rail');
  sections.forEach((sec, i) => {
    const dot = document.createElement('div');
    dot.className = 'rail-dot';
    if(i === 0) dot.classList.add('active');
    dot.setAttribute('data-num', sec.getAttribute('data-sec'));
    rail.appendChild(dot);
  });
}

// 4. Custom Cursor
function initCursor() {
  const cursor = document.querySelector('.cursor');
  const cursorLabel = document.querySelector('.cursor-label');
  
  if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
    });

    document.querySelectorAll('a, button, .menu-toggle').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('drag'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('drag'));
    });

    const quoteSection = document.querySelector('.section-quotes');
    if (quoteSection) {
      quoteSection.addEventListener('mouseenter', () => {
        cursor.classList.add('drag');
        cursorLabel.textContent = 'DRAG';
      });
      quoteSection.addEventListener('mouseleave', () => {
        cursor.classList.remove('drag');
        cursorLabel.textContent = '';
      });
    }
  } else {
    cursor.style.display = 'none'; // Hide on touch devices
  }
}

// 5. Splash Animation
function playSplash() {
  lenis.stop(); // Lock scroll
  const tl = gsap.timeline({
    onComplete: () => {
      document.getElementById('splash').style.display = 'none';
      document.body.classList.remove('loading');
      lenis.start();
      initHeroAnimations();
    }
  });

  const progressObj = { val: 0 };
  const counterEl = document.querySelector('.progress-count');

  tl.to(progressObj, {
    val: 100,
    duration: 3,
    ease: "power1.inOut",
    onUpdate: () => {
      counterEl.textContent = Math.floor(progressObj.val).toString().padStart(3, '0');
    }
  }, 0);

  tl.to('.splash-line', { height: '100%', duration: 1.5, ease: "power2.inOut" }, 0)
    .to('.splash-logo', { opacity: 1, duration: 1 }, 1)
    .fromTo('.candid-outline', { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power2.out" }, 1.5)
    .fromTo('.pixel-fill', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, 1.7)
    .to('.pixel-fill::after', { opacity: 1, duration: 0.5 }, 2)
    .fromTo('.studios-spaced', { letterSpacing: '0px', opacity: 0 }, { letterSpacing: '15px', opacity: 1, duration: 1 }, 2)
    .to('.splash', { opacity: 0, duration: 0.8, delay: 0.5 });
    
  document.querySelector('.splash-skip').addEventListener('click', () => {
    tl.progress(1);
  });
}

// 6. Navigation
function initMenu() {
  const menuBtn = document.querySelector('.menu-toggle');
  const overlay = document.querySelector('.menu-overlay');
  
  menuBtn.addEventListener('click', () => {
    state.isMenuOpen = !state.isMenuOpen;
    const text = document.querySelector('.menu-text');
    if(state.isMenuOpen) {
      lenis.stop();
      text.textContent = 'CLOSE';
      gsap.to(overlay, { y: '0%', duration: 0.8, ease: "power4.inOut" });
      gsap.to('.menu-links a', { y: '0%', duration: 0.5, stagger: 0.1, delay: 0.4, ease: "power2.out" });
    } else {
      lenis.start();
      text.textContent = 'MENU';
      gsap.to('.menu-links a', { y: '100%', duration: 0.3, stagger: 0.05, ease: "power2.in" });
      gsap.to(overlay, { y: '-100%', duration: 0.8, delay: 0.3, ease: "power4.inOut" });
    }
  });

  // Hide nav on scroll down, show on up
  let lastScroll = 0;
  const nav = document.querySelector('.top-nav');
  lenis.on('scroll', ({ scroll }) => {
    if (scroll > lastScroll && scroll > 100) {
      nav.classList.add('hidden-nav');
    } else {
      nav.classList.remove('hidden-nav');
    }
    lastScroll = scroll;
  });
}

// 7. Animations Setup
function initHeroAnimations() {
  gsap.fromTo('.hero-candid', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.5, ease: "expo.out" });
  gsap.fromTo('.hero-pixel', { opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1, duration: 1.5, delay: 0.2, ease: "expo.out" });
  
  // Parallax Titles
  gsap.to('.hero-titles', {
    y: 150,
    ease: 'none',
    scrollTrigger: {
      trigger: '.section-hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
}

function initScrollAnimations() {
  // Update Rail
  const dots = document.querySelectorAll('.rail-dot');
  document.querySelectorAll('section[data-sec]').forEach((sec, i) => {
    ScrollTrigger.create({
      trigger: sec,
      start: 'top center',
      end: 'bottom center',
      onToggle: self => {
        if (self.isActive) {
          dots.forEach(d => d.classList.remove('active'));
          dots[i].classList.add('active');
        }
      }
    });
  });

  // Marquee
  gsap.to('.marquee-track', {
    xPercent: -50,
    ease: 'none',
    scrollTrigger: {
      trigger: '.section-marquee',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5
    }
  });

  // Manifesto Line
  gsap.to('.manifesto-line', {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: '.section-manifesto',
      start: 'top center',
      end: 'bottom center',
      scrub: true
    }
  });

  // About Parallax
  const aboutImgs = document.querySelectorAll('.about-img');
  if(aboutImgs.length > 1) {
    gsap.to(aboutImgs[0], {
      y: -50, ease: 'none',
      scrollTrigger: { trigger: '.section-about', scrub: true }
    });
    gsap.to(aboutImgs[1], {
      y: 50, ease: 'none',
      scrollTrigger: { trigger: '.section-about', scrub: true }
    });
  }

  // Horizontal Scroll for Featured Work
  const track = document.querySelector('.featured-track');
  const amountToScroll = track.scrollWidth - window.innerWidth;
  
  gsap.to(track, {
    x: -amountToScroll,
    ease: 'none',
    scrollTrigger: {
      trigger: '.featured-pin',
      start: 'center center',
      end: `+=${amountToScroll}`,
      pin: true,
      scrub: 1
    }
  });

  // Process Timeline Line
  gsap.to('.process-line-fill', {
    height: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.process-timeline',
      start: 'top center',
      end: 'bottom center',
      scrub: true
    }
  });

  // Accordion FAQ
  document.querySelectorAll('.acc-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      item.classList.toggle('active');
    });
  });
  
  // Gallery Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      
      galleryItems.forEach(item => {
        if(filter === 'all' || item.getAttribute('data-category') === filter) {
          gsap.to(item, { scale: 1, opacity: 1, duration: 0.3, display: 'block' });
        } else {
          gsap.to(item, { scale: 0.8, opacity: 0, duration: 0.3, display: 'none' });
        }
      });
    });
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  populateContent();
  initCursor();
  initMenu();
  initScrollAnimations();
  
  // Play splash only once per session
  if (!sessionStorage.getItem('splashPlayed')) {
    playSplash();
    sessionStorage.setItem('splashPlayed', 'true');
  } else {
    document.getElementById('splash').style.display = 'none';
    document.body.classList.remove('loading');
    initHeroAnimations();
  }
});
