/**
 * CANDID PIXEL STUDIOS - MASTER CONTENT CONFIGURATION
 * All client details, Cloudflare R2 image assets, editorial copy,
 * statistics, reviews, and package details are defined here.
 */

export const content = {
  // CLIENT & STUDIO IDENTITY
  studio: {
    name: "Candid Pixel Studios",
    tagline: "Fine Art Photography & Cinematic Wedding Films",
    city: "Chennai",
    established: "2018",
    founder: "Karthik Subramanian",
    founderTitle: "Principal Director & Visual Architect",
    founderQuote: "We don't manufacture romance. We hunt for the unscripted fraction of a second where eternity leaks into the frame.",
    phone: "+91 99621 05239",
    phoneDisplay: "+91 99621 05239",
    whatsapp: "+91 99621 05239",
    whatsappUrl: "https://wa.me/919962105239?text=Hello%20Candid%20Pixel%20Studios,%20I%20would%20like%20to%20inquire%20about%20your%20dates.",
    email: "atelier@candidpixelstudios.com",
    instagram: "@candidpixelstudio",
    instagramUrl: "https://instagram.com/candidpixelstudio",
    youtube: "@candidpixelstudios",
    youtubeUrl: "https://youtube.com/@candidpixelstudios",
    address: "Candid Pixel Studios, Chennai, India",
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15545.986872583804!2d80.2444!3d13.0604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAzJzM3LjQiTiA4MMKwMTQnMzkuOCJF!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
  },

  // METRICS & COUNTERS
  stats: [
    { label: "Bespoke Weddings", value: 340, suffix: "+", code: "WED-340" },
    { label: "Cinematic Showreels", value: 180, suffix: "+", code: "FLM-180" },
    { label: "Decades of Devotion", value: 9, suffix: " YRS", code: "EST-2018" },
    { label: "Global Destinations", value: 16, suffix: " CITIES", code: "DST-016" }
  ],

  // SERVICES STRIP & SPECIALITIES
  services: [
    {
      id: "01",
      name: "Candid Wedding Photography",
      slug: "candid-wedding",
      tagline: "Unposed authenticity captured with prime cine lenses.",
      specs: "50mm / 85mm f/1.2 • Leica & Sony Cine Color Science",
      image: "/photos/marriage/marriage-02.jpg",
      r2Placeholder: "/photos/marriage/marriage-02.jpg"
    },
    {
      id: "02",
      name: "Wedding Films & Cinematography",
      slug: "wedding-films",
      tagline: "4K DCI anamorphic narrative feature-length heirlooms.",
      specs: "2.39:1 CinemaScope • ARRI Alexa Mini / RED V-Raptor Tone",
      image: "/photos/marriage/marriage-04.jpg",
      r2Placeholder: "/photos/marriage/marriage-04.jpg"
    },
    {
      id: "03",
      name: "Pre-Wedding Conceptuals",
      slug: "pre-wedding",
      tagline: "Vogue-editorial stories set across breathtaking locations.",
      specs: "Medium Format GFX100 • Bespoke Lighting Master",
      image: "/photos/model/model-02.jpg",
      r2Placeholder: "/photos/model/model-02.jpg"
    },
    {
      id: "04",
      name: "Heritage & Traditional Rites",
      slug: "traditional",
      tagline: "Respectful, timeless documentation of sacred ancestral customs.",
      specs: "Dual Operator Coverage • Zero-Delay Lighting Rig",
      image: "/photos/marriage/marriage-05.jpg",
      r2Placeholder: "/photos/marriage/marriage-05.jpg"
    },
    {
      id: "05",
      name: "Maternity & Heirloom Portrayals",
      slug: "maternity",
      tagline: "Intimate chiaroscuro lighting celebrating new creation.",
      specs: "Natural Daylight Atelier • Fine Art Silk Textures",
      image: "/photos/maternity/maternity-01.jpg",
      r2Placeholder: "/photos/maternity/maternity-01.jpg"
    },
    {
      id: "06",
      name: "Babies, Kids & Kinship",
      slug: "baby-kids",
      tagline: "Fleeting innocence frozen without stiff posing or flash fatigue.",
      specs: "High-Speed Shutter • Pure Organic Atmosphere",
      image: "/photos/baby/baby-01.jpg",
      r2Placeholder: "/photos/baby/baby-01.jpg"
    },
    {
      id: "07",
      name: "High-Society Soirées & Galas",
      slug: "events",
      tagline: "Low-light atmospheric coverage for curated luxury affairs.",
      specs: "Fast Primes f/1.4 • Discreet Shadow Mode",
      image: "/photos/model/model-04.jpg",
      r2Placeholder: "/photos/model/model-04.jpg"
    }
  ],

  // HERO SLIDESHOW ASSETS (Baby photo is first show-off with centered face)
  hero: [
    {
      id: "hero-1",
      couple: "Pure Innocence • Baby Aadvik",
      location: "Atelier Daylight Suite",
      aperture: "f/1.4",
      iso: "ISO 100",
      shutter: "1/500s",
      focalLength: "50mm F1.2 GM",
      url: "/photos/baby/baby-01.png",
      objectPosition: "60% 25%",
      r2Placeholder: "/photos/baby/baby-01.png"
    },
    {
      id: "hero-2",
      couple: "Darshana & Vasudevan",
      location: "Sacred Wedding Celebration",
      aperture: "f/1.2",
      iso: "ISO 200",
      shutter: "1/400s",
      focalLength: "85mm Cine",
      url: "/photos/marriage/marriage-03.jpg",
      objectPosition: "center 25%",
      r2Placeholder: "/photos/marriage/marriage-03.jpg"
    },
    {
      id: "hero-3",
      couple: "Royal Bond & Exchanged Glances",
      location: "Heritage Palace Courtyard",
      aperture: "f/1.8",
      iso: "ISO 160",
      shutter: "1/1000s",
      focalLength: "35mm Cine",
      url: "/photos/marriage/marriage-04.jpg",
      objectPosition: "center 25%",
      r2Placeholder: "/photos/marriage/marriage-04.jpg"
    },
    {
      id: "hero-4",
      couple: "Anju Gowti • New Beginnings",
      location: "Daylight Maternity Atelier",
      aperture: "f/1.4",
      iso: "ISO 125",
      shutter: "1/320s",
      focalLength: "50mm Noct",
      url: "/photos/maternity/maternity-01.jpg",
      objectPosition: "center 30%",
      r2Placeholder: "/photos/maternity/maternity-01.jpg"
    },
    {
      id: "hero-5",
      couple: "Every Love Story Begins With A Smile",
      location: "Fine Art Portrait Suite",
      aperture: "f/2.0",
      iso: "ISO 100",
      shutter: "1/800s",
      focalLength: "85mm Art",
      url: "/photos/model/model-01.jpg",
      objectPosition: "center 22%",
      r2Placeholder: "/photos/model/model-01.jpg"
    }
  ],

  // ABOUT SECTION ASSETS
  about: {
    leadImage: "/photos/marriage/marriage-03.jpg",
    secondaryImage: "/photos/model/model-03.jpg",
    tertiaryImage: "/photos/baby/baby-02.jpg",
    r2Placeholders: [
      "/photos/marriage/marriage-03.jpg",
      "/photos/model/model-03.jpg",
      "/photos/baby/baby-02.jpg"
    ]
  },

  // FEATURED HORIZONTAL PROJECTS
  featured: [
    {
      id: "feat-01",
      number: "01",
      title: "Royal Bond & Exchanged Glances",
      couple: "Darshana & Vasudevan",
      location: "Royal Heritage Courtyard",
      date: "Spring 2025",
      category: "Candid Wedding",
      url: "/photos/marriage/marriage-04.jpg",
      r2Placeholder: "/photos/marriage/marriage-04.jpg"
    },
    {
      id: "feat-02",
      number: "02",
      title: "Wrapped In Rituals & Romance",
      couple: "A Love Tale Eternal",
      location: "Sacred Temple Sanctuary",
      date: "Winter 2024",
      category: "Traditional Heritage",
      url: "/photos/marriage/marriage-05.jpg",
      r2Placeholder: "/photos/marriage/marriage-05.jpg"
    },
    {
      id: "feat-03",
      number: "03",
      title: "A Tiny Heartbeat, A World of Dreams",
      couple: "Anju Gowti",
      location: "Atelier Daylight Suite",
      date: "Spring 2025",
      category: "Maternity Heirlooms",
      url: "/photos/maternity/maternity-01.jpg",
      r2Placeholder: "/photos/maternity/maternity-01.jpg"
    },
    {
      id: "feat-04",
      number: "04",
      title: "Every Love Story Begins With A Smile",
      couple: "Editorial Portrait Master",
      location: "Fine Art Portrait Suite",
      date: "Autumn 2024",
      category: "Editorial Pre-Wedding",
      url: "/photos/model/model-01.jpg",
      r2Placeholder: "/photos/model/model-01.jpg"
    }
  ],

  // SHOWREEL & CINEMATIC FILMS
  films: {
    heroShowreel: {
      title: "The 2025 Global Atelier Showreel",
      duration: "03:42",
      aspectRatio: "2.39:1",
      poster: "/photos/marriage/marriage-04.jpg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      r2Placeholder: "/photos/marriage/marriage-04.jpg"
    },
    chapters: [
      {
        id: "ch-1",
        title: "Vows in Silence",
        couple: "Darshana & Vasudevan",
        location: "Sacred Mandapam",
        timecode: "00:00:24",
        thumb: "/photos/marriage/marriage-03.jpg"
      },
      {
        id: "ch-2",
        title: "A Love Tale",
        couple: "The Grand Celebration",
        location: "Royal Heritage Courtyard",
        timecode: "00:01:15",
        thumb: "/photos/marriage/marriage-01.jpg"
      },
      {
        id: "ch-3",
        title: "Little Miracles",
        couple: "Baby Aadvik",
        location: "Daylight Suite",
        timecode: "00:02:08",
        thumb: "/photos/baby/baby-01.jpg"
      },
      {
        id: "ch-4",
        title: "Wrapped in Romance",
        couple: "The Sacred Knots",
        location: "Ancestral Hall",
        timecode: "00:03:02",
        thumb: "/photos/marriage/marriage-05.jpg"
      }
    ]
  },

  // GALLERY / CONTACT SHEET
  gallery: {
    wedding: [
      {
        id: "g-w1",
        frame: "FR-014A",
        caption: "A Love Tale & Shared Promises",
        url: "/photos/marriage/marriage-01.jpg",
        aspect: "1/1"
      },
      {
        id: "g-w2",
        frame: "FR-015A",
        caption: "Sacred Exchange of Glances",
        url: "/photos/marriage/marriage-02.jpg",
        aspect: "1/1"
      },
      {
        id: "g-w3",
        frame: "FR-016A",
        caption: "Every Moment Feels Like Forever",
        url: "/photos/marriage/marriage-03.jpg",
        aspect: "4/5"
      },
      {
        id: "g-w4",
        frame: "FR-017A",
        caption: "Royal Bond & Wedding Celebration",
        url: "/photos/marriage/marriage-04.jpg",
        aspect: "4/5"
      }
    ],
    prewedding: [
      {
        id: "g-pw1",
        frame: "FR-021B",
        caption: "Every Love Story Begins With A Smile",
        url: "/photos/model/model-01.jpg",
        aspect: "1/1"
      },
      {
        id: "g-pw2",
        frame: "FR-022B",
        caption: "Editorial Couple Portraiture",
        url: "/photos/model/model-02.jpg",
        aspect: "1/1"
      },
      {
        id: "g-pw3",
        frame: "FR-023B",
        caption: "Love and Happy Ever After",
        url: "/photos/model/model-03.jpg",
        aspect: "4/5"
      }
    ],
    baby: [
      {
        id: "g-b1",
        frame: "FR-031C",
        caption: "Enjoy The Little Things In Life",
        url: "/photos/baby/baby-01.jpg",
        aspect: "1/1"
      },
      {
        id: "g-b2",
        frame: "FR-032C",
        caption: "Pure Joy & Fleeting Innocence",
        url: "/photos/baby/baby-02.jpg",
        aspect: "1/1"
      }
    ],
    events: [
      {
        id: "g-e1",
        frame: "FR-041D",
        caption: "Wrapped in Rituals & Romance",
        url: "/photos/marriage/marriage-05.jpg",
        aspect: "4/5"
      },
      {
        id: "g-e2",
        frame: "FR-042D",
        caption: "Celebrations of Pure Elegance",
        url: "/photos/model/model-04.jpg",
        aspect: "4/5"
      }
    ]
  },

  // PROCESS TIMELINE (F-STOPS)
  process: [
    {
      fStop: "f/1.4",
      label: "Enquiry & Date Reverence",
      desc: "We verify calendar resonance. We take on strictly 24 bespoke commissions a year to guarantee unhurried creative immersion.",
      duration: "Day 01"
    },
    {
      fStop: "f/2.8",
      label: "Curatorial Coffee & Moodboard",
      desc: "Meeting in-person or via private stream. We decode your lineage, wardrobe palette, and emotional rhythm.",
      duration: "Week 02"
    },
    {
      fStop: "f/4.0",
      label: "The Unobtrusive Shoot",
      desc: "On location with prime anamorphic glass. We blend into the celebrations like old friends, capturing raw unfiltered joy.",
      duration: "Wedding Days"
    },
    {
      fStop: "f/8.0",
      label: "Color Grade & Sound Architecture",
      desc: "Meticulous color grading shot-by-shot in DaVinci Resolve. Film scores composed specifically for your narrative.",
      duration: "6-8 Weeks"
    },
    {
      fStop: "f/16",
      label: "The Heirlooms Handover",
      desc: "Handcrafted Italian leather album bound in archival velvet, plus your 4K master drives inside a brushed gold wooden casket.",
      duration: "Final Delivery"
    }
  ],

  // TESTIMONIALS & MOMENTS QUOTE WALL (Pure English quotes, no Tamil text)
  quotes: [
    {
      id: "q-1",
      quote: "When we saw our film, our parents broke down in tears. It wasn't a wedding video — it felt like an intimate European art-house cinema masterpiece.",
      author: "Dr. Aishwarya & Vikramaditya",
      role: "Bangalore & Lake Como Wedding",
      stars: 5,
      date: "February 2025",
      photo: "/photos/marriage/marriage-01.jpg"
    },
    {
      id: "q-2",
      quote: "Candid Pixel gave us the gift of remembering how it FELT, not just how it looked. The team was so respectful and completely invisible during the sacred rituals.",
      author: "Pooja & Siddharth Menon",
      role: "Royal Heritage Celebration",
      stars: 5,
      date: "December 2024",
      photo: "/photos/model/model-02.jpg"
    },
    {
      id: "q-3",
      quote: "The f/1.2 portrait of my grandfather looking at me through the mandap pillars will stay on our living room wall for three generations. Pure wizardry.",
      author: "Ananya & Raghavan Chettiar",
      role: "Traditional Heritage Wedding",
      stars: 5,
      date: "January 2025",
      photo: "/photos/marriage/marriage-03.jpg"
    }
  ],

  // PACKAGES & CURATED COMMISSIONS
  packages: [
    {
      id: "pkg-1",
      badge: "The Signature Atelier",
      title: "Silver Halide",
      tagline: "Essential pure documentation for discerning multi-day celebrations.",
      days: "2 Full Days",
      inclusions: [
        "2 Senior Candid Photographers + 2 Traditional Photographers",
        "2 Cinematographers with Gimbal & Prime Cine Kits",
        "One 4K DCI Signature Teaser (3-5 Minutes)",
        "One Long-Form Ceremony Feature Film (30-45 Minutes)",
        "500+ Hand-Retouched Color-Graded Fine Art Stills",
        "1 Bespoke Handcrafted Leather Heirloom Album (40 Spreads)"
      ],
      priceGuide: "Bespoke Quote on Consultation",
      recommended: false
    },
    {
      id: "pkg-2",
      badge: "Most Commissioned",
      title: "Imperial Anamorphic",
      tagline: "Our marquee production with director-led crew and aerial coverage.",
      days: "3 Full Days",
      inclusions: [
        "Principal Director Karthik Subramanian on site",
        "3 Master Candid Artists + 2 Lighting Technicians",
        "3 CinemaScope Cinematographers + Dual Licensed Drone Pilots",
        "Same-Day Edit (SDE) Teaser screened during Reception",
        "Full Feature Cinematic Narrative Documentary (60 Minutes)",
        "800+ Hand-Retouched Master RAW Stills",
        "2 Parent Albums + 1 Grand Master Velvet Casket Album"
      ],
      priceGuide: "Inquire for Exact Dates",
      recommended: true
    },
    {
      id: "pkg-3",
      badge: "Royal Global Commission",
      title: "The Sovereign Legacy",
      tagline: "Unconstrained luxury across pre-wedding overseas and high-society nuptials.",
      days: "4+ Days / Destination",
      inclusions: [
        "Worldwide Destination Travel Included (Europe, UAE or Pan-India)",
        "2-Day Pre-Wedding Conceptual Film in Remote International Locale",
        "Full Crew of 8 Masters with RED & ARRI Medium Format Setup",
        "Live Satellite 4K Multi-Cam Broadcast for Overseas Guests",
        "Bespoke Film Score Orchestrated by Studio Composers",
        "Lifetime Cloud Archival Vault + Solid Titanium Backup Drive"
      ],
      priceGuide: "Exclusive Atelier Rate",
      recommended: false
    }
  ],

  // THE ATELIER TEAM ("Behind The Glass" using our real photography artists)
  team: [
    {
      id: "t-1",
      name: "Karthik Subramanian",
      role: "Founder & Creative Director",
      experience: "12 Yrs • Leica Ambassador Fellowship",
      photo: "/photos/marriage/marriage-05.jpg",
      r2Placeholder: "/photos/marriage/marriage-05.jpg"
    },
    {
      id: "t-2",
      name: "Dr. Malavika Nair",
      role: "Lead Colorist & Cinematography Lead",
      experience: "9 Yrs • DaVinci Resolve Master Class",
      photo: "/photos/model/model-01.jpg",
      r2Placeholder: "/photos/model/model-01.jpg"
    },
    {
      id: "t-3",
      name: "Arvind Swaminathan",
      role: "Principal Candid Portraitist",
      experience: "8 Yrs • Sony Alpha Artisan",
      photo: "/photos/marriage/marriage-01.jpg",
      r2Placeholder: "/photos/marriage/marriage-01.jpg"
    },
    {
      id: "t-4",
      name: "Shreya Venkat",
      role: "Archival Album Curator & Stylist",
      experience: "7 Yrs • Fine Art Print Master",
      photo: "/photos/baby/baby-02.jpg",
      r2Placeholder: "/photos/baby/baby-02.jpg"
    }
  ],

  // REELS & SOCIAL FEED
  reels: [
    {
      id: "reel-1",
      title: "Wrapped In Rituals & Romance",
      views: "1.2M",
      thumb: "/photos/marriage/marriage-05.jpg",
      link: "https://instagram.com/candidpixelstudios"
    },
    {
      id: "reel-2",
      title: "Enjoy The Little Things In Life",
      views: "890K",
      thumb: "/photos/baby/baby-01.jpg",
      link: "https://instagram.com/candidpixelstudios"
    },
    {
      id: "reel-3",
      title: "Every Moment With You Feels Like Forever",
      views: "2.4M",
      thumb: "/photos/marriage/marriage-03.jpg",
      link: "https://instagram.com/candidpixelstudios"
    },
    {
      id: "reel-4",
      title: "A Love Tale Eternal",
      views: "1.5M",
      thumb: "/photos/marriage/marriage-01.jpg",
      link: "https://instagram.com/candidpixelstudios"
    },
    {
      id: "reel-5",
      title: "A Tiny Heartbeat, A World Of Dreams",
      views: "780K",
      thumb: "/photos/maternity/maternity-01.jpg",
      link: "https://instagram.com/candidpixelstudios"
    }
  ],

  // FAQ ITEMS
  faqs: [
    {
      question: "Do you travel across India and internationally for weddings?",
      answer: "Yes, more than 60% of our calendar consists of destination weddings across Udaipur, Jaipur, Kerala, Dubai, Bali, Lake Como and Thailand. Our travel logistics are managed end-to-end by our studio team."
    },
    {
      question: "How does Candid Pixel differ from typical wedding photography teams?",
      answer: "We do not run factory-scale operations. We cap our intake at 24 weddings per year. We shoot with high-end cine primes (f/1.2 - f/1.4), never use harsh direct flash, and our color science is calibrated individually for Indian skin tones under diverse temple and palace lighting."
    },
    {
      question: "How long after the wedding do we receive our final films and albums?",
      answer: "The Same-Day Edit (if commissioned) is screened at your reception. A 3-minute teaser is delivered within 14 days. The complete master film and full retouched photo gallery are delivered within 6 to 8 weeks in our handcrafted archival velvet box."
    },
    {
      question: "Can we customize the hours and number of team members?",
      answer: "Every royal wedding is unique. During our curatorial consultation, we tailor the number of cinematographers, aerial pilots and candid photographers based on your guest count and simultaneous event locations."
    },
    {
      question: "How far in advance should we secure our dates?",
      answer: "Most of our auspicious wedding muhurtham dates are locked 6 to 10 months in advance. We recommend reaching out as soon as your venue and dates are finalized."
    }
  ]
};
