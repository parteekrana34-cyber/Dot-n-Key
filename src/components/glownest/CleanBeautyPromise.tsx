import React from 'react';
import { ShieldCheck, Heart, Leaf, Sparkles, Droplets, CheckCircle2 } from 'lucide-react';

export const CleanBeautyPromise: React.FC = () => {
  const pillars = [
    {
      icon: Leaf,
      title: '100% Vegan & Cruelty-Free',
      desc: 'Never tested on animals. PETA-certified formulas made solely from plant botanicals and clean actives.',
      color: 'bg-[#DCFCE7] text-[#15803D]',
    },
    {
      icon: ShieldCheck,
      title: 'Dermatologically Tested',
      desc: 'Formulated to ISO & GMP standards, patch-tested on Indian skin to guarantee zero irritation.',
      color: 'bg-[#FFE5EC] text-[#E11D48]',
    },
    {
      icon: Droplets,
      title: 'Zero Toxic Nasties',
      desc: 'No parabens, no sulfates (SLS/SLES), no mineral oil, no phthalates, and zero pore-clogging waxes.',
      color: 'bg-[#E0F2FE] text-[#0369A1]',
    },
    {
      icon: Sparkles,
      title: 'Clinically Proven Actives',
      desc: 'Stabilized Vitamin C, 5-Ceramide complexes, and multi-molecular Hyaluronic Acid that actually deliver results.',
      color: 'bg-[#EDE9FE] text-[#6D28D9]',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-[#F0E6E1]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFF0F3] text-[#FF6584] mb-3">
            <Heart className="w-3.5 h-3.5 fill-[#FF6584]" />
            <span>The Dot &amp; Key Clean Standard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1E1B1D] tracking-tight">
            Gentle on Skin, Fierce on Results
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6E75] mt-2 leading-relaxed">
            We believe skincare should be playful, vibrant, and joyful — backed by honest dermatological science and clean, skin-loving superfoods.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 rounded-3xl bg-[#FAF7F5] border border-[#EFE5E0] hover:border-[#FFD1DC] hover:shadow-card transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${pillar.color} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base text-[#1E1B1D] mb-1.5 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#6B5E66] leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Interactive Routine Step Ribbon */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#FFF0F3] via-[#FFE5EC] to-[#EDE9FE] border border-[#FFD1DC] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-black text-lg sm:text-xl text-[#1E1B1D]">
              The 4-Step Golden Glow Routine ✨
            </h3>
            <p className="text-xs text-[#52474E]">
              1. Gentle Foaming Cleanse → 2. Vitamin C / Niacinamide Treatment → 3. 72hr Moisture Hydration → 4. Dewy SPF 50+ Shield
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-white text-[#E11D48] text-xs font-bold shadow-xs">
              pH 5.5 Balanced
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white text-[#22C55E] text-xs font-bold shadow-xs">
              Non-Comedogenic
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
