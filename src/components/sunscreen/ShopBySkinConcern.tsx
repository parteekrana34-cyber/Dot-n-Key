import React from 'react';
import { Sun, Sparkles, Droplets, Feather, ShieldCheck, Heart, Flame } from 'lucide-react';
import { SkinConcernCategory } from '../../types/sunscreen';

interface ShopBySkinConcernProps {
  selectedConcern: SkinConcernCategory;
  onSelectConcern: (concern: SkinConcernCategory) => void;
}

export const ShopBySkinConcern: React.FC<ShopBySkinConcernProps> = ({
  selectedConcern,
  onSelectConcern,
}) => {
  const concerns: {
    category: SkinConcernCategory;
    title: string;
    tagline: string;
    icon: React.ElementType;
    badgeColor: string;
    activeBorder: string;
  }[] = [
    {
      category: 'All Sunscreens',
      title: 'All Sunscreens',
      tagline: 'Complete SPF 50+ Lineup',
      icon: Sun,
      badgeColor: 'bg-[#FFE5EC] text-[#E11D48]',
      activeBorder: 'border-[#FF6584]',
    },
    {
      category: 'Oily Skin',
      title: 'Oily Skin',
      tagline: 'Mattifying, shine-free & non-comedogenic',
      icon: Flame,
      badgeColor: 'bg-[#ECFDF5] text-[#047857]',
      activeBorder: 'border-[#10B981]',
    },
    {
      category: 'Dry Skin',
      title: 'Dry Skin',
      tagline: 'Deep ceramides & hyaluronic hydration',
      icon: Droplets,
      badgeColor: 'bg-[#E0F2FE] text-[#0369A1]',
      activeBorder: 'border-[#0EA5E9]',
    },
    {
      category: 'Sensitive Skin',
      title: 'Sensitive Skin',
      tagline: 'Fragrance-free, cica calming & soothing',
      icon: ShieldCheck,
      badgeColor: 'bg-[#F5F3FF] text-[#6D28D9]',
      activeBorder: 'border-[#8B5CF6]',
    },
    {
      category: 'Combination Skin',
      title: 'Combination Skin',
      tagline: 'Balances oily T-zone & dry cheeks',
      icon: Feather,
      badgeColor: 'bg-[#FFF1F2] text-[#BE123C]',
      activeBorder: 'border-[#F43F5E]',
    },
    {
      category: 'Dull-Looking Skin',
      title: 'Dull-Looking Skin',
      tagline: 'Vitamin C & blood orange glow booster',
      icon: Sparkles,
      badgeColor: 'bg-[#FFF7ED] text-[#C2410C]',
      activeBorder: 'border-[#F97316]',
    },
    {
      category: 'Lightweight Daily Sunscreen',
      title: 'Lightweight Daily',
      tagline: 'Water-burst fluids for everyday wear',
      icon: Sun,
      badgeColor: 'bg-[#FEF9C3] text-[#A16207]',
      activeBorder: 'border-[#EAB308]',
    },
  ];

  return (
    <section id="skin-concerns-section" className="py-10 sm:py-14 bg-white border-b border-[#F5D5DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#FCEEF2] text-[#633D4B] border border-[#F5D5DE] shadow-xs mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FF8C9A]" />
            <span>Targeted Sun Care</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#633D4B] tracking-tight font-display">
            Shop by Skin Concern
          </h2>
          <p className="text-xs sm:text-sm text-[#8E6B78] mt-1.5 leading-relaxed">
            Select your primary skin need to instantly reveal the ideal Bloom &amp; Blush sunscreen tailored for you.
          </p>
        </div>

        {/* Horizontal Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-3.5">
          {concerns.map((item) => {
            const Icon = item.icon;
            const isActive = selectedConcern === item.category;

            return (
              <button
                key={item.category}
                onClick={() => {
                  onSelectConcern(item.category);
                  const catalogEl = document.getElementById('sunscreen-catalog-grid');
                  if (catalogEl) {
                    catalogEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`flex flex-col items-center p-3.5 sm:p-4 rounded-3xl transition-all duration-300 text-center cursor-pointer border ${
                  isActive
                    ? 'bg-[#FF8C9A] text-white shadow-coral scale-[1.03] border-[#FF8C9A]'
                    : 'bg-[#FCEEF2]/60 hover:bg-white text-[#633D4B] border-[#F5D5DE] hover:border-[#FF8C9A] hover:shadow-card'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-2.5 transition-colors ${
                    isActive ? 'bg-white/20 text-white' : 'bg-white text-[#FF8C9A] shadow-xs border border-[#F5D5DE]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <span className="font-extrabold text-xs sm:text-sm leading-snug">
                  {item.title}
                </span>

                <span
                  className={`text-[10px] mt-1 line-clamp-2 leading-tight ${
                    isActive ? 'text-white/90' : 'text-[#8E6B78]'
                  }`}
                >
                  {item.tagline}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
