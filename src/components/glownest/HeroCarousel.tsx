import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { HERO_SLIDES } from '../../data/skincareCatalog';
import { SkincareCategory } from '../../types/skincare';

interface HeroCarouselProps {
  onShopNow: () => void;
  onExploreBestsellers: () => void;
  onOpenSkinQuiz: () => void;
  onSelectCategory: (category: SkincareCategory) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  onShopNow,
  onExploreBestsellers,
  onOpenSkinQuiz,
  onSelectCategory,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = HERO_SLIDES[activeSlide];

  const handlePrimaryClick = () => {
    if (activeSlide === 0) {
      onShopNow();
    } else if (activeSlide === 1) {
      onSelectCategory('Face Serums');
    } else {
      onSelectCategory('Moisturizers');
    }
  };

  const handleSecondaryClick = () => {
    if (activeSlide === 0) {
      onExploreBestsellers();
    } else {
      onOpenSkinQuiz();
    }
  };

  return (
    <section
      className="relative overflow-hidden pt-6 pb-12 lg:pt-10 lg:pb-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br ${current.bgColor} border border-white/70 shadow-soft overflow-hidden transition-all duration-700`}
        >
          {/* Subtle Decorative pastel fruit & dew floating circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/40 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-24 w-72 h-72 rounded-full bg-[#FFE5EC]/50 blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-14">
            {/* Left Content column */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-5 sm:space-y-6">
              {/* Top Tag & Trust chip */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 text-[#FF6584] shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                  {current.tag}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[#6B5E66]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                  Dermatologist Approved
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black text-[#1E1B1D] tracking-tight leading-[1.15]">
                {current.title}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#52474E] max-w-xl font-normal leading-relaxed">
                {current.subtitle}
              </p>

              {/* Key Features Quick Checklist */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-1">
                {current.features.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-xs text-xs font-semibold text-[#3D3338] border border-white/80 shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                <button
                  onClick={handlePrimaryClick}
                  className="px-6 sm:px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF6584] to-[#F43F5E] text-white font-extrabold text-sm sm:text-base hover:shadow-bubble hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center gap-2"
                >
                  <span>{current.ctaPrimary}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleSecondaryClick}
                  className="px-6 sm:px-7 py-3.5 rounded-2xl bg-white/90 hover:bg-white text-[#2D2A2E] border border-white/90 hover:border-[#FFD1DC] font-bold text-sm sm:text-base shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  {current.ctaSecondary}
                </button>
              </div>

              {/* Extra proof line */}
              <div className="pt-2 flex items-center gap-3 text-xs text-[#7A6E75]">
                <div className="flex -space-x-1.5">
                  <img
                    className="w-6 h-6 rounded-full border-2 border-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="Reviewer"
                  />
                  <img
                    className="w-6 h-6 rounded-full border-2 border-white object-cover"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80"
                    alt="Reviewer"
                  />
                  <img
                    className="w-6 h-6 rounded-full border-2 border-white object-cover"
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
                    alt="Reviewer"
                  />
                </div>
                <span>
                  Loved by <strong>45,000+</strong> happy skincare lovers across India
                </span>
              </div>
            </div>

            {/* Right Product Image Showcase */}
            <div className="lg:col-span-5 flex justify-center items-center relative">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-4/3 sm:aspect-square flex items-center justify-center">
                {/* Backing aesthetic pastel frame */}
                <div className="absolute inset-4 sm:inset-6 rounded-3xl bg-white/60 backdrop-blur-xs border border-white shadow-card rotate-2" />

                {/* Main Product Photography */}
                <img
                  src={current.image}
                  alt={current.title}
                  className="relative z-10 w-full h-full object-cover rounded-3xl shadow-xl transition-all duration-700 transform hover:scale-[1.03]"
                />

                {/* Floating Highlight Badge */}
                <div className="absolute -bottom-3 sm:bottom-4 left-4 sm:-left-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-lg border border-[#FFD1DC] flex items-center gap-3 animate-soft-pulse">
                  <div className="w-10 h-10 rounded-xl bg-[#FFE5EC] text-[#FF6584] flex items-center justify-center font-black">
                    ✨
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-[#1E1B1D]">{current.badgeText}</p>
                    <p className="text-[11px] font-medium text-[#7A6E75]">{current.badgeSub}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Controls: Arrows & Indicators */}
          <div className="absolute bottom-4 right-6 flex items-center gap-2 z-20">
            <button
              onClick={() =>
                setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
              }
              className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#3D3338] hover:text-[#FF6584] flex items-center justify-center shadow-xs transition-all cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5 px-2">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    activeSlide === idx
                      ? 'w-7 bg-[#FF6584]'
                      : 'w-2.5 bg-white/80 hover:bg-white'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
              className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#3D3338] hover:text-[#FF6584] flex items-center justify-center shadow-xs transition-all cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
