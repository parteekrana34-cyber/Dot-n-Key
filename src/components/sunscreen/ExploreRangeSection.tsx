import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { EXPLORE_RANGE_CARDS, RangeCardItem } from '../../data/sunscreenCatalog';
import { SkinConcernCategory } from '../../types/sunscreen';

interface ExploreRangeSectionProps {
  onSelectConcern: (concern: SkinConcernCategory) => void;
  onExploreRange: (rangeId: string) => void;
}

export const ExploreRangeSection: React.FC<ExploreRangeSectionProps> = ({
  onSelectConcern,
  onExploreRange,
}) => {
  const rangeDetails: Record<
    string,
    {
      concern: SkinConcernCategory;
      tag: string;
      highlights: string[];
      cta: string;
    }
  > = {
    'watermelon-aha': {
      concern: 'Oily Skin',
      tag: 'JUICY COOLING GLOW 🍉',
      highlights: ['Watermelon Matte SPF 50+', 'AHA Pore Tightening Cleanser', '10% AHA + 2% BHA Serum'],
      cta: 'Explore Watermelon Range',
    },
    'hyaluronic-ceramides': {
      concern: 'Dry Skin',
      tag: '72-HR DEEP REPAIR 💧',
      highlights: ['Hydrating Barrier SPF 50+', '2% Hyaluronic + 3 Ceramides', 'Skin Replenishing Gel Cream'],
      cta: 'Explore Ceramides Range',
    },
    'strawberry-niacinamide': {
      concern: 'Lightweight Daily Sunscreen',
      tag: 'DEWY TINT & LIP CARE 🍓',
      highlights: ['Strawberry Dew Tinted SPF 50+', 'Ultra-Light Daily Gel-Cream', 'Strawberry Niacinamide Lip Balm'],
      cta: 'Explore Strawberry Range',
    },
    'vitaminc-orange': {
      concern: 'Dull-Looking Skin',
      tag: 'SUPER BRIGHT RADIANCE 🍊',
      highlights: ['Water-Light Sunscreen SPF 50+', '10% Ethyl Ascorbic Serum', 'Blood Orange Glow Moisturizer'],
      cta: 'Explore Vitamin C Range',
    },
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FCEEF2] border-b border-[#F5D5DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching Screenshot 5 */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white text-[#633D4B] border border-[#F5D5DE] shadow-xs mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FF8C9A]" />
            <span>Targeted Fruit Systems</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#633D4B] tracking-tight font-display">
            Explore Our Range
          </h2>
          <p className="text-xs sm:text-sm text-[#8E6B78] mt-1.5 leading-relaxed">
            Discover complete synergistic regimens crafted around fruit powerhouses and dermatologist-backed active ingredients.
          </p>
        </div>

        {/* 4 Large Range Cards matching Screenshot 5 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {EXPLORE_RANGE_CARDS.map((card) => {
            const detail = rangeDetails[card.id] || {
              concern: 'All Sunscreens',
              tag: 'FEATURED RANGE',
              highlights: ['Dermatologist Tested', 'Clean Fruit Actives', 'Zero White Cast'],
              cta: 'Explore Collection',
            };

            return (
              <div
                key={card.id}
                className="group relative flex flex-col rounded-3xl bg-white border border-[#F5D5DE] hover:border-[#FF8C9A] overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                {/* Hero Product Flatlay Photo */}
                <div className="relative w-full aspect-4/3 overflow-hidden bg-[#FCEEF2]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Floating Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/95 backdrop-blur-xs text-[#633D4B] shadow-xs border border-[#F5D5DE]">
                      {detail.tag}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className={`font-black text-base sm:text-lg ${card.textColor} tracking-tight font-display`}>
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#8E6B78] mt-1 font-medium leading-relaxed">
                      {card.tagline}
                    </p>

                    {/* Highlights bullet checklist */}
                    <div className="mt-3.5 space-y-1.5 pt-3 border-t border-[#F5D5DE]">
                      {detail.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] font-semibold text-[#633D4B]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF8C9A] shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Range CTA Button in Coral Pink on hover */}
                  <button
                    onClick={() => {
                      onSelectConcern(detail.concern);
                      onExploreRange(card.id);
                    }}
                    className="w-full py-2.5 px-4 rounded-2xl bg-[#FCEEF2] group-hover:bg-[#FF8C9A] text-[#633D4B] group-hover:text-white border border-[#F5D5DE] group-hover:border-[#FF8C9A] font-black text-xs transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>{detail.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
