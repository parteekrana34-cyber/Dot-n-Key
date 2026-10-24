import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORY_CARDS } from '../../data/skincareCatalog';
import { SkincareCategory } from '../../types/skincare';

interface FeaturedCategoriesProps {
  onSelectCategory: (category: SkincareCategory) => void;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-8 sm:py-12 bg-white/60 border-y border-[#F0E6E1]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF6584] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Tailored To Every Skin Need</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B1D] tracking-tight">
              Explore By Category
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#7A6E75] max-w-sm mt-1 sm:mt-0">
            From broad-spectrum UV protection to barrier repair formulas, find the perfect step for your daily glow.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-3.5">
          {CATEGORY_CARDS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.queryCategory)}
              className="group relative flex flex-col items-center p-3.5 sm:p-4 rounded-3xl bg-white border border-[#EFE5E0] hover:border-[#FFD1DC] hover:shadow-card-hover transition-all duration-300 text-center cursor-pointer overflow-hidden text-left"
            >
              {/* Product Category Circle Avatar */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden mb-3 border border-white/80 shadow-xs">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Title & Tagline */}
              <span className="font-bold text-sm text-[#1E1B1D] group-hover:text-[#FF6584] transition-colors leading-snug">
                {cat.name}
              </span>
              <span className="text-[11px] text-[#7A6E75] mt-0.5 line-clamp-1">
                {cat.tagline}
              </span>

              {/* Hover arrow badge */}
              <div className="mt-2 text-[10px] font-bold text-[#FF6584] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                <span>View</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
