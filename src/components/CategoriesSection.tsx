import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { CategoryType } from '../types/jewellery';

interface CategoriesSectionProps {
  onSelectCategory: (category: CategoryType) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onSelectCategory,
}) => {
  return (
    <section id="collections" className="py-24 bg-[#FAF7F2] border-b border-[#EAE3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.28em] text-[#8C6D46] font-medium mb-2">
            Curated Expressions
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#2A2421] tracking-tight">
            Jewellery Categories
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#6E6056] font-light leading-relaxed">
            Every creation is sculpted to celebrate personal milestones, everlasting unions, and daily elegance.
          </p>
        </div>

        {/* Categories Grid - 6 Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className="group relative cursor-pointer overflow-hidden bg-[#F2EDE4] border border-[#E4DDD1] hover-luxury-lift hover:border-[#C5A880] hover:shadow-xl hover:shadow-[#C5A880]/15 flex flex-col justify-between will-change-transform"
            >
              {/* Image Aspect ratio container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EAE3D8]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A2421]/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                
                {/* Top Corner Action Indicator */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#2A2421] group-hover:bg-[#C5A880] group-hover:text-white transition-all duration-300 shadow-sm">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Text Card Body */}
              <div className="p-6 bg-[#FAF7F2] flex-1 flex flex-col justify-between border-t border-[#EAE3D8]/80">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8C7B70] uppercase tracking-[0.16em] mb-1">
                    <span>{category.itemCount} Designs</span>
                    <span className="text-[#8C6D46] font-medium group-hover:translate-x-1 transition-transform duration-200">
                      Explore &rarr;
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#2A2421] font-medium tracking-tight group-hover:text-[#8C6D46] transition-colors">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-xs text-[#6E6056] leading-relaxed line-clamp-2 font-light">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
