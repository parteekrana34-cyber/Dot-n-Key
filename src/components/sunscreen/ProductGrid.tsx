import React, { useState, useMemo } from 'react';
import { Sun, Sparkles, ArrowUpDown, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { SunscreenProduct, SkinConcernCategory } from '../../types/sunscreen';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: SunscreenProduct[];
  selectedConcern: SkinConcernCategory;
  onSelectConcern: (concern: SkinConcernCategory) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: SunscreenProduct) => void;
  onAddToCart: (product: SunscreenProduct, size: string) => void;
  onQuickView: (product: SunscreenProduct) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedConcern,
  onSelectConcern,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) => {
  const [sortBy, setSortBy] = useState<string>('featured');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedConcern !== 'All Sunscreens') {
      result = result.filter((p) => p.skinConcerns.includes(selectedConcern));
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        result.sort((a, b) => b.discountPercent - a.discountPercent);
        break;
      case 'bestseller':
        result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
      default:
        break;
    }

    return result;
  }, [products, selectedConcern, sortBy]);

  return (
    <section id="sunscreen-catalog-grid" className="py-12 sm:py-16 bg-[#FCEEF2] border-b border-[#F5D5DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Sort Dropdown */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#FF8C9A] mb-1">
              <Sun className="w-3.5 h-3.5 text-[#FF8C9A] fill-[#FF8C9A]" />
              <span>Broad Spectrum UVA &bull; UVB &bull; Blue Light</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#633D4B] tracking-tight font-display">
              Sunscreen Collection
            </h2>
            <p className="text-xs sm:text-sm text-[#8E6B78] mt-1 leading-relaxed">
              Every formula is clinically patch-tested on Indian skin to guarantee zero white cast.
            </p>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <span className="text-xs font-bold text-[#8E6B78] flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#F5D5DE] hover:border-[#FF8C9A] text-[#633D4B] text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF8C9A]/20 cursor-pointer shadow-xs"
            >
              <option value="featured">Featured &amp; Popular</option>
              <option value="bestseller">Bestsellers First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="discount">Biggest Savings</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips & Counter */}
        <div className="flex items-center justify-between text-xs text-[#8E6B78] mb-6 pb-3 border-b border-[#F5D5DE]">
          <div>
            Showing <strong className="text-[#633D4B]">{filteredProducts.length}</strong> sunscreen products
            {selectedConcern !== 'All Sunscreens' && (
              <span className="ml-2 px-2.5 py-0.5 rounded-full bg-[#F9DDE5] text-[#633D4B] font-bold border border-[#F5D5DE]">
                {selectedConcern}
              </span>
            )}
          </div>

          {(selectedConcern !== 'All Sunscreens' || sortBy !== 'featured') && (
            <button
              onClick={() => {
                onSelectConcern('All Sunscreens');
                setSortBy('featured');
              }}
              className="flex items-center gap-1 text-[#FF8C9A] hover:underline font-bold cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              Reset Filters
            </button>
          )}
        </div>

        {/* Sunscreen Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
