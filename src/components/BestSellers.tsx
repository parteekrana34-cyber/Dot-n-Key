import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { Product } from '../types/jewellery';
import { ProductCard } from './ProductCard';

interface BestSellersProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onBuyNow: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
  onViewAllCatalog: () => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
  onViewAllCatalog,
}) => {
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4);

  return (
    <section id="best-sellers" className="scroll-mt-28 py-20 sm:py-24 bg-[#F8F4EE] border-b border-[#E7DFD4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#8C6D46] font-medium mb-2">
              <Heart className="w-3.5 h-3.5 fill-[#8C6D46]" />
              <span>Collector Favorites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#2A2421] tracking-tight">
              Loved by You ❤️
            </h2>
            <p className="mt-3 text-sm text-[#6E6056] font-light max-w-xl">
              Our most celebrated designs, cherished by collectors across the globe for their timeless sparkle and artisanal comfort.
            </p>
          </div>

          <button
            onClick={onViewAllCatalog}
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#2A2421] font-semibold hover:text-[#8C6D46] transition-colors group"
          >
            <span>Explore All Icons</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {bestsellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
