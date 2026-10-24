import React from 'react';
import { Sun, Sparkles, ArrowRight, ShieldCheck, Heart, Droplets } from 'lucide-react';
import dotkeySunscreenHeroImg from '../../assets/images/dotkey_sunscreen_hero_1792127387605.jpg';

interface SummerFlatlayShowcaseProps {
  onShopNow: () => void;
  onOpenQuiz: () => void;
}

export const SummerFlatlayShowcase: React.FC<SummerFlatlayShowcaseProps> = ({
  onShopNow,
  onOpenQuiz,
}) => {
  return (
    <section className="py-12 sm:py-16 bg-[#FCEEF2] border-b border-[#F5D5DE] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl sm:rounded-[2.5rem] bg-white border border-[#F5D5DE] shadow-card overflow-hidden">
          {/* Subtle Rosy Glow Background Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#F9DDE5]/60 to-[#FCEEF2]/30 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Image: The User's Beautiful Home Page Sunscreen Flatlay Photo */}
            <div className="lg:col-span-7 relative overflow-hidden group">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[460px] w-full overflow-hidden bg-[#FCEEF2]">
                <img
                  src={dotkeySunscreenHeroImg}
                  alt="Bloom & Blush Sunscreen Flatlay - Vitamin C, Cica and Barrier SPF 50+ with fresh citrus and watermelon"
                  className="w-full h-full object-cover object-center transform group-hover:scale-103 transition-transform duration-700"
                />

                {/* Floating Soft Badge */}
                <div className="absolute top-4 left-4 z-10 animate-float">
                  <span className="px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-white/95 text-[#633D4B] shadow-md border border-[#F5D5DE] flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-[#FF8C9A] fill-[#FF8C9A] animate-spin-slow" />
                    <span>In-Vivo Tested SPF 50+</span>
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 z-10 animate-float-reverse">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#FF8C9A] text-white shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span>Zero White Cast</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-center space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FCEEF2] text-[#633D4B] border border-[#F5D5DE] text-xs font-black uppercase tracking-wider self-start">
                <Heart className="w-3.5 h-3.5 text-[#FF8C9A] fill-[#FF8C9A]" />
                <span>The Sun Protection Edit</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#633D4B] tracking-tight font-display leading-[1.15]">
                Fresh Fruit Actives. <br />
                <span className="text-[#FF8C9A]">Invisible Daily Shield.</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#8E6B78] leading-relaxed">
                Meet the holy grail formulas crafted for Indian summer heat. Combining broad-spectrum UVA &amp; UVB filters with real watermelon, Sicilian blood orange, and soothing cica for maximum hydration and all-day glow.
              </p>

              {/* Feature Checklist */}
              <div className="space-y-2 pt-1 text-xs font-bold text-[#633D4B]">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#FCEEF2] border border-[#F5D5DE] flex items-center justify-center shrink-0">
                    <Droplets className="w-3 h-3 text-[#FF8C9A]" />
                  </div>
                  <span>Water-burst texture that sinks in within 10 seconds</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#FCEEF2] border border-[#F5D5DE] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3 h-3 text-[#FF8C9A]" />
                  </div>
                  <span>No white cast guarantee across all skin tones</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#FCEEF2] border border-[#F5D5DE] flex items-center justify-center shrink-0">
                    <Sun className="w-3 h-3 text-[#FF8C9A]" />
                  </div>
                  <span>Non-comedogenic &amp; ophthalmologically tested</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={onShopNow}
                  className="px-6 py-3 rounded-2xl bg-[#FF8C9A] hover:bg-[#FF7586] text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg shadow-[#FF8C9A]/30 transition-all duration-200 cursor-pointer flex items-center gap-2"
                >
                  <span>Shop Summer Edit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenQuiz}
                  className="px-5 py-3 rounded-2xl bg-[#FCEEF2] hover:bg-[#F9DDE5] text-[#633D4B] border border-[#F5D5DE] font-extrabold text-xs sm:text-sm transition-all duration-200 cursor-pointer"
                >
                  Take SPF Match Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
