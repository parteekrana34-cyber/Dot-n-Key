import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PerfumeProduct } from '../../types/perfume';
import { ProductCard } from './ProductCard';
import { useTheme } from '../../context/ThemeContext';

interface BestsellersSectionProps {
  products: PerfumeProduct[];
  wishlistIds: string[];
  onToggleWishlist: (product: PerfumeProduct) => void;
  onQuickView: (product: PerfumeProduct) => void;
  onSelectProduct: (product: PerfumeProduct) => void;
  onAddToCart: (product: PerfumeProduct, size: string) => void;
  onExploreAll: () => void;
}

export const BestsellersSection: React.FC<BestsellersSectionProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onSelectProduct,
  onAddToCart,
  onExploreAll,
}) => {
  const { isLight } = useTheme();
  const bestsellers = products.filter((p) => p.isBestseller || p.isSignature);

  return (
    <section
      id="bestsellers"
      className={`scroll-mt-24 py-20 sm:py-28 transition-colors duration-300 border-b ${
        isLight 
          ? 'bg-[#FAF7F2] border-[#9A742A]/20' 
          : 'bg-[#171515] border-[#C2A064]/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="space-y-3">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] uppercase tracking-[0.25em] font-sans ${
              isLight
                ? 'border-[#9A742A]/40 bg-[#FFFFFF] text-[#591D2D] shadow-sm'
                : 'border-[#C2A064]/40 bg-[#421C27]/40 text-[#DFC48E]'
            }`}>
              <Sparkles className={`w-3.5 h-3.5 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
              <span>Crowning Creations</span>
            </div>
            <h2 className={`font-serif text-3xl sm:text-5xl font-normal tracking-tight transition-colors ${
              isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'
            }`}>
              Bestselling Fragrances
            </h2>
            <p className={`text-sm sm:text-base max-w-xl font-sans transition-colors ${
              isLight ? 'text-[#5C5456]' : 'text-[#A89F93]'
            }`}>
              The signature extraits chosen by nobility, collectors, and patrons across Paris, London, and Mumbai.
            </p>
          </div>

          <button
            onClick={onExploreAll}
            className={`inline-flex items-center gap-2 text-xs font-sans tracking-[0.2em] uppercase transition-colors group ${
              isLight ? 'text-[#591D2D] hover:text-[#9A742A]' : 'text-[#DFC48E] hover:text-[#F3EDE3]'
            }`}
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {bestsellers.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
