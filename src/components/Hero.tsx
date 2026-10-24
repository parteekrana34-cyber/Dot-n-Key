import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Gem, ChevronLeft, ChevronRight } from 'lucide-react';
import heroImg from '../assets/images/hero_jewellery_luxury_1791349588259.jpg';
import bridalImg from '../assets/images/bridal_jewellery_set_1791349619308.jpg';
import signatureImg from '../assets/images/signature_collection_1791349605807.jpg';

interface HeroProps {
  onShopCollection: () => void;
  onExploreNewArrivals: () => void;
}

interface Slide {
  id: number;
  image: string;
  tag: string;
  kicker: string;
  headline: string;
  italicWord: string;
  subtitle: string;
  alt: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    image: heroImg,
    tag: 'Haute Joaillerie & Ethical Diamonds',
    kicker: 'Est. 2026 · Fine Atelier',
    headline: 'Jewellery That Tells',
    italicWord: 'Your Story.',
    subtitle: "Discover timeless designs crafted for life's most precious moments.",
    alt: 'Payora Jewels Haute Joaillerie diamond necklace and earrings on warm travertine',
  },
  {
    id: 2,
    image: bridalImg,
    tag: 'Ceremonial Heirlooms & Solitaires',
    kicker: 'Bridal Atelier Collection',
    headline: 'Cherish Everlasting',
    italicWord: 'Devotion.',
    subtitle: 'Handcrafted engagement suites and certified diamonds sculpted to be treasured across generations.',
    alt: 'Payora Jewels Royal bridal jewellery set with choker and earrings',
  },
  {
    id: 3,
    image: signatureImg,
    tag: 'Contemporary 18K Solid Gold',
    kicker: 'Signature Series',
    headline: 'Sculptural Splendor in',
    italicWord: 'Pure 18K Gold.',
    subtitle: 'Fluid modern architectural silhouettes designed for daily distinction and celebratory nights.',
    alt: 'Payora Jewels Signature architectural collection masterwork necklace',
  },
];

export const Hero: React.FC<HeroProps> = ({
  onShopCollection,
  onExploreNewArrivals,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance slider every 6.5 seconds
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const activeSlide = SLIDES[currentSlide];

  return (
    <section 
      className="relative min-h-[88vh] md:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#241F1C]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Payora Jewels Hero Banner Showcase"
    >
      {/* Background Image Slider with Smooth Cross-Fade and Gentle Zoom */}
      {SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className={`w-full h-full object-cover object-center transform transition-transform duration-[7000ms] ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
              referrerPolicy="no-referrer"
            />
            {/* Multi-tier Dark Scrim & Radial Vignette for maximum legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#181311]/90 via-[#241E1B]/75 to-[#181311]/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181311] via-transparent to-black/50" />
            <div className="absolute inset-0 bg-black/35 backdrop-blur-[0.5px]" />
          </div>
        );
      })}

      {/* Slide Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-[#1E1917]/70 hover:bg-[#C5A880] text-[#EFEAE2] hover:text-[#1E1917] border border-[#DDD3C7]/20 backdrop-blur-md transition-all duration-200 focus:outline-none shadow-lg group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-[#1E1917]/70 hover:bg-[#C5A880] text-[#EFEAE2] hover:text-[#1E1917] border border-[#DDD3C7]/20 backdrop-blur-md transition-all duration-200 focus:outline-none shadow-lg group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Center Editorial Content with Staggered Entrance */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 py-20 text-center text-white flex flex-col items-center">
        {/* Subtle Luxury Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs tracking-[0.28em] uppercase text-[#EAD8C2] font-sans font-medium mb-6 bg-black/30 border border-[#C5A880]/30 backdrop-blur-xs rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
          <span>{activeSlide.tag}</span>
          <span className="w-1 h-1 rounded-full bg-[#C5A880]" />
          <span className="hidden sm:inline">{activeSlide.kicker}</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.08] text-[#FAF7F2] max-w-4xl text-balance drop-shadow-sm transition-all duration-700">
          {activeSlide.headline} <br className="hidden sm:inline" />
          <span className="italic font-normal text-[#EAD8C2]">{activeSlide.italicWord}</span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-base sm:text-lg md:text-xl font-sans font-light text-[#E5DDD4] max-w-2xl leading-relaxed text-balance transition-all duration-700 drop-shadow-xs">
          {activeSlide.subtitle}
        </p>

        {/* Call-to-Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <button
            onClick={onShopCollection}
            className="w-full sm:w-auto px-8 py-4 bg-[#C5A880] text-[#1E1917] hover:bg-[#D6BC96] text-xs uppercase tracking-[0.22em] font-semibold transition-all duration-200 shadow-xl shadow-black/40 flex items-center justify-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50"
          >
            <span>Shop Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>

          <button
            onClick={onExploreNewArrivals}
            className="w-full sm:w-auto px-8 py-4 bg-black/35 text-[#FAF7F2] border border-[#E0D1BF]/40 hover:border-[#FAF7F2] hover:bg-white/10 text-xs uppercase tracking-[0.22em] font-medium transition-all duration-200 backdrop-blur-sm flex items-center justify-center focus:outline-none"
          >
            <span>Explore New Arrivals</span>
          </button>
        </div>

        {/* Slide Indicators Dots & Numbers */}
        <div className="mt-10 flex items-center gap-3 z-20">
          {SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 flex items-center gap-2 group focus:outline-none ${
                  isActive ? 'text-[#C5A880]' : 'text-[#8C7B70] hover:text-[#FAF7F2]'
                }`}
                aria-label={`Jump to slide ${idx + 1}`}
              >
                <span className="text-[10px] font-mono tracking-widest uppercase">
                  0{idx + 1}
                </span>
                <span
                  className={`h-[2px] transition-all duration-300 ${
                    isActive ? 'w-8 bg-[#C5A880]' : 'w-3 bg-white/30 group-hover:bg-white/60'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Hallmarks of Excellence Bar */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-[#FFFFFF]/15 grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 text-left text-xs tracking-wide text-[#DFD6CC] w-full max-w-4xl">
          <div className="flex items-center gap-3">
            <Gem className="w-4 h-4 text-[#C5A880] shrink-0" />
            <div>
              <p className="font-medium text-[#FAF7F2]">18K Recycled Gold</p>
              <p className="text-[11px] text-[#B5A599]">Sustainably refined metals</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0" />
            <div>
              <p className="font-medium text-[#FAF7F2]">Conflict-Free Gems</p>
              <p className="text-[11px] text-[#B5A599]">GIA & IGI certification</p>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
            <div>
              <p className="font-medium text-[#FAF7F2]">Lifetime Atelier Warranty</p>
              <p className="text-[11px] text-[#B5A599]">Complimentary cleaning & care</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
