import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { content } from './content/content';
import { useLenis } from './hooks/useLenis';
import { useSessionOnce } from './hooks/useSessionOnce';

// Master Components
import Splash from './components/Splash';
import Navbar from './components/Navbar';
import MenuOverlay from './components/MenuOverlay';
import SectionRail from './components/SectionRail';
import MobileDock from './components/MobileDock';
import Cursor from './components/Cursor';
import Grain from './components/Grain';

// All 16 Required Sections (01 to 16)
import Section01Hero from './sections/Section01Hero';
import Section02Marquee from './sections/Section02Marquee';
import Section03Manifesto from './sections/Section03Manifesto';
import Section04About from './sections/Section04About';
import Section05Specialities from './sections/Section05Specialities';
import Section06Featured from './sections/Section06Featured';
import Section07Films from './sections/Section07Films';
import Section08Gallery from './sections/Section08Gallery';
import Section09Process from './sections/Section09Process';
import Section10Quotes from './sections/Section10Quotes';
import Section11Packages from './sections/Section11Packages';
import Section12Team from './sections/Section12Team';
import Section13Reels from './sections/Section13Reels';
import Section14Faq from './sections/Section14Faq';
import Section15Booking from './sections/Section15Booking';
import Section16Footer from './sections/Section16Footer';

export default function App() {
  // Initialize Lenis smooth scroll synced with GSAP
  useLenis();

  // Run Splash screen once per session
  const [splashViewed, markSplashViewed] = useSessionOnce('candid_pixel_splash_v1');
  const [showSplash, setShowSplash] = useState(!splashViewed);

  // Fullscreen Menu State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSplashDone = () => {
    markSplashViewed();
    setShowSplash(false);
  };

  // Structured Data (LocalBusiness JSON-LD)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": content.studio.name,
    "description": content.studio.tagline,
    "founder": {
      "@type": "Person",
      "name": content.studio.founder
    },
    "telephone": content.studio.phone,
    "email": content.studio.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": content.studio.address,
      "addressLocality": content.studio.city,
      "addressCountry": "IN"
    },
    "url": "https://candidpixelstudios.com",
    "image": content.hero[0].url,
    "priceRange": "$$$$"
  };

  return (
    <>
      <Helmet>
        <title>{content.studio.name} &bull; {content.studio.tagline}</title>
        <meta name="description" content="A bespoke photography and cinematography atelier crafting timeless European and heritage Indian wedding heirlooms." />
        <meta name="keywords" content="candid wedding photography, luxury wedding films, pre-wedding cinematography, destination wedding photographer" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${content.studio.name} | Elite Wedding Cinema`} />
        <meta property="og:description" content={content.studio.tagline} />
        <meta property="og:image" content={content.hero[0].url} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={content.studio.name} />
        <meta name="twitter:description" content={content.studio.tagline} />
        <meta name="twitter:image" content={content.hero[0].url} />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Physics Cursor (Desktop Only) */}
      <Cursor />

      {/* Ambient Film Grain Overlay */}
      <Grain />

      {/* Splash Screen (Plays once per session) */}
      {showSplash && <Splash onComplete={handleSplashDone} />}

      {/* Navigation Systems */}
      <Navbar onOpenMenu={() => setIsMenuOpen(true)} isMenuOpen={isMenuOpen} />
      <SectionRail />
      <MobileDock />
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Main Viewport: All 16 Sections in Strict Sequence */}
      <main id="main-content">
        <Section01Hero />
        <Section02Marquee />
        <Section03Manifesto />
        <Section04About />
        <Section05Specialities />
        <Section06Featured />
        <Section07Films />
        <Section08Gallery />
        <Section09Process />
        <Section10Quotes />
        <Section11Packages />
        <Section12Team />
        <Section13Reels />
        <Section14Faq />
        <Section15Booking />
        <Section16Footer />
      </main>
    </>
  );
}
