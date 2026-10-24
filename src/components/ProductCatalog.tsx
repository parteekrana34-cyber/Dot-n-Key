import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, Search, RotateCcw } from 'lucide-react';
import { Product, CategoryType } from '../types/jewellery';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  wishlistIds: string[];
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onBuyNow: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
}

const CATEGORIES_LIST: CategoryType[] = [
  'All',
  'Rings',
  'Earrings',
  'Necklaces',
  'Bracelets',
  'Bridal Jewellery',
  'Luxury Collection',
];

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(800000);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.materials.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = p.price <= maxPrice;
        return matchesCategory && matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // default featured
      });
  }, [products, selectedCategory, searchQuery, maxPrice, sortBy]);

  const resetFilters = () => {
    onSelectCategory('All');
    setSearchQuery('');
    setMaxPrice(800000);
    setSortBy('featured');
  };

  return (
    <section id="catalog" className="py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.28em] text-[#8C6D46] font-medium mb-2">
            The Complete Atelier
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#2A2421] tracking-tight">
            Our Fine Jewellery Catalog
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#6E6056] font-light">
            Each creation is an individualized statement of timeless distinction. Filter by category, price, or metal.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#F6F1EA] border border-[#E7DFD4] p-4 sm:p-6 mb-10 space-y-4">
          {/* Category Tabs (Segmented control) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            {CATEGORIES_LIST.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all duration-200 ${
                    active
                      ? 'bg-[#2A2421] text-[#FAF7F2] shadow-sm'
                      : 'bg-white/60 text-[#6E6056] hover:bg-white hover:text-[#2A2421]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sub Filters: Search, Price Slider, Sort Dropdown */}
          <div className="pt-3 border-t border-[#EAE3D8] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#8C7B70] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search rings, pendants, diamonds, gold..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-[#DDD3C7] text-xs text-[#2A2421] placeholder-[#A4968C] focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>

            {/* Price Filter & Sort controls */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Max Price Range Slider */}
              <div className="flex items-center gap-2 text-xs text-[#6E6056]">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C6D46]" />
                <span>Max Price:</span>
                <span className="font-semibold text-[#2A2421] tabular-nums">
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
                <input
                  type="range"
                  min="30000"
                  max="800000"
                  step="25000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-24 sm:w-32 accent-[#C5A880] cursor-pointer"
                />
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2 text-xs text-[#6E6056]">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#8C6D46]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-[#DDD3C7] text-xs py-1.5 px-3 text-[#2A2421] focus:outline-none focus:border-[#C5A880] cursor-pointer"
                >
                  <option value="featured">Featured Creations</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {(searchQuery || selectedCategory !== 'All' || maxPrice < 800000 || sortBy !== 'featured') && (
                <button
                  onClick={resetFilters}
                  className="p-1.5 text-xs text-[#8C6D46] hover:text-[#2A2421] flex items-center gap-1 font-medium underline"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#8C7B70] mb-6">
          <span>
            Showing <strong className="text-[#2A2421] tabular-nums">{filteredProducts.length}</strong> creations
          </span>
          {selectedCategory !== 'All' && (
            <span className="text-[#8C6D46] font-medium">Filtered by: {selectedCategory}</span>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
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
        ) : (
          <div className="py-20 text-center bg-[#F7F3EC] border border-[#E8E1D6]">
            <p className="font-serif text-2xl text-[#2A2421]">No Creations Matched Your Selection</p>
            <p className="mt-2 text-xs text-[#7A6C63]">
              Try adjusting your price range or clearing search keywords.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 px-6 py-2.5 bg-[#2A2421] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#8C6D46] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
