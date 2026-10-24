import React from 'react';
import { Sparkles, ShieldCheck, Flame, Droplets, Gem } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const BrandStorySection: React.FC = () => {
  const { isLight } = useTheme();

  return (
    <section
      id="our-story"
      className={`scroll-mt-24 py-20 sm:py-28 transition-colors duration-300 border-b relative overflow-hidden ${
        isLight 
          ? 'bg-[#F5EFE6] border-[#9A742A]/20' 
          : 'bg-[#131111] border-[#C2A064]/20'
      }`}
    >
      {/* Ambient background glows */}
      <div className={`absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 blur-[130px] rounded-full pointer-events-none ${
        isLight ? 'bg-[#DFC48E]/25' : 'bg-[#421C27]/30'
      }`} />
      <div className={`absolute bottom-0 right-0 w-80 h-80 blur-[120px] rounded-full pointer-events-none ${
        isLight ? 'bg-[#9A742A]/15' : 'bg-[#C2A064]/10'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Photo Collage */}
          <div className="lg:col-span-5 relative">
            <div className={`relative aspect-[4/5] rounded-xl overflow-hidden border shadow-xl ${
              isLight ? 'border-[#E5D9C5] bg-[#FAF7F2]' : 'border-[#C2A064]/40 bg-[#171515]'
            }`}>
              <img
                src="/src/assets/images/perfume_burgundy_rose_1791959202926.jpg"
                alt="VELMORA Atelier Extraction"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Inset Quote Plaque */}
              <div className={`absolute bottom-6 left-6 right-6 p-5 rounded-lg backdrop-blur-md border shadow-xl ${
                isLight 
                  ? 'bg-[#FFFFFF]/90 border-[#9A742A]/40 text-[#1A1616]' 
                  : 'bg-[#171515]/90 border-[#C2A064]/40 text-[#F3EDE3]'
              }`}>
                <p className="font-serif italic text-base leading-relaxed">
                  "Perfume is the unspoken language of the soul. At VELMORA, we formulate scents not to conceal who you are, but to announce your destiny."
                </p>
                <span className={`text-[10px] tracking-[0.25em] uppercase font-sans font-semibold block mt-2 ${
                  isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'
                }`}>
                  — Master Nez, Maison Velmora
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: The Art of Perfumery Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] uppercase tracking-[0.25em] font-sans ${
              isLight
                ? 'border-[#9A742A]/40 bg-[#FFFFFF] text-[#591D2D] shadow-sm'
                : 'border-[#C2A064]/40 bg-[#421C27]/40 text-[#DFC48E]'
            }`}>
              <Sparkles className={`w-3.5 h-3.5 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
              <span>The Art of Haute Parfumerie</span>
            </div>

            <h2 className={`font-serif text-3xl sm:text-5xl font-normal tracking-tight leading-tight transition-colors ${
              isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'
            }`}>
              Crafted in Secrecy. <br />
              <span className={`italic ${
                isLight 
                  ? 'text-[#9A742A]' 
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-[#DFC48E] via-[#C2A064] to-[#DFC48E]'
              }`}>
                Worn by the Discerning.
              </span>
            </h2>

            <p className={`text-sm sm:text-base font-sans leading-relaxed transition-colors ${
              isLight ? 'text-[#5C5456]' : 'text-[#A89F93]'
            }`}>
              Founded on the belief that genuine luxury requires patience, uncompromising purity, and artisanal mastery, VELMORA operates as an independent private perfume house. We reject synthetic shortcuts and industrial dilution.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className={`p-4 rounded-lg border space-y-1.5 transition-colors ${
                isLight 
                  ? 'bg-[#FFFFFF] border-[#E5D9C5] shadow-xs' 
                  : 'bg-[#1E1A1B] border-[#C2A064]/20'
              }`}>
                <div className={`flex items-center gap-2 ${isLight ? 'text-[#9A742A]' : 'text-[#DFC48E]'}`}>
                  <Droplets className={`w-4 h-4 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
                  <h4 className="font-sans font-medium text-xs tracking-wider uppercase">
                    32% – 36% Pure Essence
                  </h4>
                </div>
                <p className={`text-xs font-sans leading-relaxed ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
                  Each flacon is formulated as a true Extrait de Parfum, requiring only two sprays for an all-day, unyielding presence.
                </p>
              </div>

              <div className={`p-4 rounded-lg border space-y-1.5 transition-colors ${
                isLight 
                  ? 'bg-[#FFFFFF] border-[#E5D9C5] shadow-xs' 
                  : 'bg-[#1E1A1B] border-[#C2A064]/20'
              }`}>
                <div className={`flex items-center gap-2 ${isLight ? 'text-[#9A742A]' : 'text-[#DFC48E]'}`}>
                  <Flame className={`w-4 h-4 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
                  <h4 className="font-sans font-medium text-xs tracking-wider uppercase">
                    Aged Wild Agarwood
                  </h4>
                </div>
                <p className={`text-xs font-sans leading-relaxed ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
                  Ethically sourced from 25-year mature wild trees in Cambodia and Assam, macerated in French oak casks for three seasons.
                </p>
              </div>

              <div className={`p-4 rounded-lg border space-y-1.5 transition-colors ${
                isLight 
                  ? 'bg-[#FFFFFF] border-[#E5D9C5] shadow-xs' 
                  : 'bg-[#1E1A1B] border-[#C2A064]/20'
              }`}>
                <div className={`flex items-center gap-2 ${isLight ? 'text-[#9A742A]' : 'text-[#DFC48E]'}`}>
                  <Gem className={`w-4 h-4 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
                  <h4 className="font-sans font-medium text-xs tracking-wider uppercase">
                    Grasse Dawn Harvest
                  </h4>
                </div>
                <p className={`text-xs font-sans leading-relaxed ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
                  Centifolia May roses and royal jasmine petals picked exclusively between 5:00 AM and 7:00 AM to preserve volatile top oils.
                </p>
              </div>

              <div className={`p-4 rounded-lg border space-y-1.5 transition-colors ${
                isLight 
                  ? 'bg-[#FFFFFF] border-[#E5D9C5] shadow-xs' 
                  : 'bg-[#1E1A1B] border-[#C2A064]/20'
              }`}>
                <div className={`flex items-center gap-2 ${isLight ? 'text-[#9A742A]' : 'text-[#DFC48E]'}`}>
                  <ShieldCheck className={`w-4 h-4 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
                  <h4 className="font-sans font-medium text-xs tracking-wider uppercase">
                    Bespoke Flacons
                  </h4>
                </div>
                <p className={`text-xs font-sans leading-relaxed ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
                  Hand-polished heavyweight flint glass engineered to protect fragile botanicals from UV degradation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
