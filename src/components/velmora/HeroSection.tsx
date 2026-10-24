import React from 'react';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface HeroSectionProps {
  onExploreCollection: () => void;
  onOpenFragranceFinder: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCollection,
  onOpenFragranceFinder,
}) => {
  const { isLight } = useTheme();

  return (
    <section className={`relative min-h-[92vh] flex items-center justify-center overflow-hidden transition-colors duration-300 border-b ${
      isLight 
        ? 'bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6] to-[#FAF7F2] border-[#9A742A]/20' 
        : 'bg-gradient-to-b from-[#171515] via-[#120F10] to-[#171515] border-[#C2A064]/20'
    }`}>
      {/* Background Ambient Glows & Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] blur-[140px] rounded-full transition-colors duration-500 ${
          isLight ? 'bg-[#DFC48E]/25' : 'bg-[#421C27]/40'
        }`} />
        <div className={`absolute top-1/3 -right-20 w-[450px] h-[450px] blur-[120px] rounded-full transition-colors duration-500 ${
          isLight ? 'bg-[#9A742A]/15' : 'bg-[#C2A064]/10'
        }`} />
        <div className={`absolute bottom-10 left-10 w-[350px] h-[350px] blur-[100px] rounded-full transition-colors duration-500 ${
          isLight ? 'bg-[#591D2D]/10' : 'bg-[#421C27]/30'
        }`} />
        
        {/* Subtle Gold Dust Sparkle Particles */}
        <div className={`absolute top-1/4 left-1/6 w-1 h-1 rounded-full animate-ping opacity-60 ${
          isLight ? 'bg-[#9A742A]' : 'bg-[#DFC48E]'
        }`} />
        <div className={`absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full animate-pulse opacity-70 ${
          isLight ? 'bg-[#9A742A]' : 'bg-[#C2A064]'
        }`} />
        <div className={`absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full animate-ping opacity-50 ${
          isLight ? 'bg-[#9A742A]' : 'bg-[#DFC48E]'
        }`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Brand Story & Headline */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 animate-fade-in-up">
          {/* Tagline Pill */}
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-md transition-all duration-300 ${
            isLight
              ? 'border-[#9A742A]/40 bg-[#FFFFFF]/80 shadow-[0_2px_15px_rgba(154,116,42,0.12)]'
              : 'border-[#C2A064]/40 bg-[#1E1A1B]/80 shadow-[0_0_20px_rgba(194,160,100,0.15)]'
          }`}>
            <Sparkles className={`w-3.5 h-3.5 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
            <span className={`text-[11px] sm:text-xs font-sans tracking-[0.25em] uppercase font-medium ${
              isLight ? 'text-[#591D2D]' : 'text-[#DFC48E]'
            }`}>
              A Scent That Defines You
            </span>
          </div>

          {/* Main Cinematic Headline */}
          <h1 className={`font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight leading-[1.08] transition-colors duration-300 ${
            isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'
          }`}>
            Leave a Lasting <br />
            <span className={`italic font-light text-transparent bg-clip-text ${
              isLight 
                ? 'bg-gradient-to-r from-[#1A1616] via-[#9A742A] to-[#591D2D]' 
                : 'bg-gradient-to-r from-[#F3EDE3] via-[#DFC48E] to-[#C2A064]'
            }`}>
              Impression.
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-base sm:text-xl max-w-xl font-sans font-light leading-relaxed transition-colors duration-300 ${
            isLight ? 'text-[#5C5456]' : 'text-[#A89F93]'
          }`}>
            Exceptional fragrances. Unforgettable presence. Discover hand-poured Extraits de Parfum formulated with 32% pure botanical essences, rare wild Cambodian agarwood, and Grasse May roses.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 w-full sm:w-auto">
            {/* Primary Explore Button */}
            <button
              onClick={onExploreCollection}
              className={`group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-sm font-sans font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 ${
                isLight 
                  ? 'bg-gradient-to-r from-[#1A1616] via-[#3A2228] to-[#1A1616] text-[#FAF7F2] shadow-[0_10px_25px_rgba(26,22,22,0.25)] hover:shadow-[0_15px_35px_rgba(26,22,22,0.35)] hover:scale-[1.02]' 
                  : 'bg-gradient-to-r from-[#C2A064] via-[#DFC48E] to-[#C2A064] text-[#171515] shadow-[0_10px_25px_rgba(194,160,100,0.3)] hover:shadow-[0_15px_35px_rgba(194,160,100,0.45)] hover:brightness-105'
              }`}
            >
              <span>Explore the Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Signature Scent Finder Quiz Button */}
            <button
              onClick={onOpenFragranceFinder}
              className={`group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-sm border font-sans font-medium text-xs sm:text-sm tracking-[0.18em] uppercase transition-all duration-300 backdrop-blur-sm ${
                isLight 
                  ? 'border-[#9A742A]/50 bg-[#FFFFFF] text-[#1A1616] hover:bg-[#F4EFE6] hover:border-[#9A742A] shadow-sm' 
                  : 'border-[#C2A064]/50 bg-[#1E1A1B]/70 hover:bg-[#421C27]/60 text-[#F3EDE3] hover:border-[#C2A064]'
              }`}
            >
              <Compass className={`w-4 h-4 group-hover:rotate-45 transition-transform duration-300 ${
                isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'
              }`} />
              <span>Find Your Signature Scent</span>
            </button>
          </div>

          {/* Haute Parfumerie Proof Highlights */}
          <div className={`grid grid-cols-3 gap-4 pt-8 border-t w-full transition-colors duration-300 ${
            isLight ? 'border-[#9A742A]/20' : 'border-[#C2A064]/20'
          }`}>
            <div>
              <p className={`font-serif text-2xl sm:text-3xl font-medium ${
                isLight ? 'text-[#9A742A]' : 'text-[#DFC48E]'
              }`}>32%+</p>
              <p className={`text-[11px] sm:text-xs uppercase tracking-wider font-sans mt-0.5 ${
                isLight ? 'text-[#73696B]' : 'text-[#A89F93]'
              }`}>
                Pure Extrait Oil
              </p>
            </div>
            <div>
              <p className={`font-serif text-2xl sm:text-3xl font-medium ${
                isLight ? 'text-[#9A742A]' : 'text-[#DFC48E]'
              }`}>16h+</p>
              <p className={`text-[11px] sm:text-xs uppercase tracking-wider font-sans mt-0.5 ${
                isLight ? 'text-[#73696B]' : 'text-[#A89F93]'
              }`}>
                Lasting Sillage
              </p>
            </div>
            <div>
              <p className={`font-serif text-2xl sm:text-3xl font-medium ${
                isLight ? 'text-[#9A742A]' : 'text-[#DFC48E]'
              }`}>Bespoke</p>
              <p className={`text-[11px] sm:text-xs uppercase tracking-wider font-sans mt-0.5 ${
                isLight ? 'text-[#73696B]' : 'text-[#A89F93]'
              }`}>
                Gift Packaging
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Perfume Flacon Showcase */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className={`relative w-full max-w-lg aspect-[4/5] sm:aspect-[4/4.8] rounded-xl overflow-hidden border group transition-all duration-500 ${
            isLight 
              ? 'border-[#9A742A]/40 shadow-[0_20px_50px_rgba(154,116,42,0.18)]' 
              : 'border-[#C2A064]/40 shadow-[0_25px_60px_rgba(0,0,0,0.85)]'
          }`}>
            {/* Background Halo */}
            <div className={`absolute inset-0 bg-gradient-to-t z-10 pointer-events-none opacity-60 ${
              isLight ? 'from-[#1A1616]/70 via-transparent to-transparent' : 'from-[#171515] via-transparent to-transparent'
            }`} />

            {/* Hero Image */}
            <img
              src="/src/assets/images/velmora_hero_flacon_1791959201130.jpg"
              alt="VELMORA Haute Parfumerie Flacon"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
              referrerPolicy="no-referrer"
            />

            {/* Overlaid Editorial Plaque */}
            <div className={`absolute bottom-6 left-6 right-6 z-20 p-4 sm:p-5 rounded-lg backdrop-blur-md border shadow-lg flex items-center justify-between ${
              isLight
                ? 'bg-[#FFFFFF]/90 border-[#9A742A]/35 text-[#1A1616]'
                : 'bg-[#171515]/85 border-[#C2A064]/35 text-[#F3EDE3]'
            }`}>
              <div>
                <span className={`text-[10px] tracking-[0.25em] uppercase font-sans font-medium block ${
                  isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'
                }`}>
                  Signature Extrait
                </span>
                <h3 className={`font-serif text-lg sm:text-xl font-normal ${
                  isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'
                }`}>
                  L'Ombre Royale
                </h3>
                <p className={`text-xs font-sans ${isLight ? 'text-[#615759]' : 'text-[#A89F93]'}`}>
                  Aged Cambodian Oud • Damascena Rose • Ambergris
                </p>
              </div>

              <div className="text-right">
                <span className={`text-xs block ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>50ml Extrait</span>
                <span className={`font-serif text-lg font-medium ${isLight ? 'text-[#9A742A]' : 'text-[#DFC48E]'}`}>₹16,800</span>
              </div>
            </div>

            {/* Subtle Gold Frame Inset */}
            <div className={`absolute inset-3 border pointer-events-none rounded-lg ${
              isLight ? 'border-[#9A742A]/25' : 'border-[#C2A064]/20'
            }`} />
          </div>
        </div>
      </div>
    </section>
  );
};
