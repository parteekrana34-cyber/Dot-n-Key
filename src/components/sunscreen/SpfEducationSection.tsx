import React from 'react';
import { Sun, ShieldCheck, Sparkles, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { SPF_EDUCATION_CARDS } from '../../data/sunscreenCatalog';

export const SpfEducationSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-[#F5D5DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#FCEEF2] text-[#633D4B] border border-[#F5D5DE] shadow-xs mb-2">
            <Sun className="w-3.5 h-3.5 text-[#FF8C9A] fill-[#FF8C9A]" />
            <span>Sun Protection Science 101</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#633D4B] tracking-tight font-display">
            Demystifying SPF &amp; Broad Spectrum
          </h2>
          <p className="text-xs sm:text-sm text-[#8E6B78] mt-1.5 leading-relaxed">
            Understanding why daily sunscreen is the single most effective anti-aging and skin health step you can ever take.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {SPF_EDUCATION_CARDS.map((card) => (
            <div
              key={card.title}
              className="p-6 rounded-3xl bg-white border border-[#F5D5DE] hover:border-[#FF8C9A] shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FCEEF2] text-[#633D4B] border border-[#F5D5DE] shadow-xs mb-3">
                  {card.badge}
                </span>
                <h3 className="font-black text-base sm:text-lg text-[#633D4B] mb-2 font-display">
                  {card.title}
                </h3>
                <p className="text-xs text-[#8E6B78] leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F5D5DE] flex items-center gap-1 text-[11px] font-bold text-[#FF8C9A]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Clinically Validated</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive 2-Finger Rule & Reapplication Visual Banner */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#F9DDE5] via-[#FCEEF2] to-[#F9DDE5] border border-[#F5D5DE] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="font-black text-lg sm:text-xl text-[#633D4B] flex items-center justify-center md:justify-start gap-2 font-display">
              <span>The Dermatologist 2-Finger Rule</span>
              <span className="text-xl">✌️</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#8E6B78] max-w-2xl leading-relaxed">
              Always dispense two full finger lengths of sunscreen for your face and neck. Squeeze along your index and middle fingers to get the required 2mg/cm² coverage for full SPF 50+ protection.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="px-3.5 py-2 rounded-2xl bg-white/95 text-[#633D4B] text-xs font-black shadow-xs border border-[#F5D5DE]">
              Every Morning • 365 Days
            </span>
            <span className="px-3.5 py-2 rounded-2xl bg-white/95 text-[#FF8C9A] text-xs font-black shadow-xs border border-[#F5D5DE]">
              Reapply Every 2-3 Hours
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
