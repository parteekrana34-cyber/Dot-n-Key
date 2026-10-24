import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '../types/jewellery';
import { ProductCard } from './ProductCard';

interface NewArrivalsProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onBuyNow: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
  onViewAllCatalog: () => void;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
  onViewAllCatalog,
}) => {
  // Filter new items (limit 4 to 6)
  const newProducts = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <section id="new-arrivals" className="scroll-mt-28 py-20 sm:py-24 bg-[#FAF7F2] border-b border-[#EAE3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#8C6D46] font-medium mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Spring / Summer 2026</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#2A2421] tracking-tight">
              New Arrivals ✨
            </h2>
            <p className="mt-3 text-sm text-[#6E6056] font-light max-w-xl">
              Freshly sculpted from our European ateliers. Contemporary silhouettes designed for modern luxury.
            </p>
          </div>

          <button
            onClick={onViewAllCatalog}
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#2A2421] font-semibold hover:text-[#8C6D46] transition-colors group"
          >
            <span>View All New Releases</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {newProducts.map((product) => (
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
