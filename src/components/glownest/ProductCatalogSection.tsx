import React, { useState, useMemo } from 'react';
import { Sparkles, SlidersHorizontal, ArrowUpDown, Check, RefreshCw } from 'lucide-react';
import { SkincareProduct, SkincareCategory, SkinConcern } from '../../types/skincare';
import { ProductCard } from './ProductCard';

interface ProductCatalogSectionProps {
  products: SkincareProduct[];
  selectedCategory: string;
  onSelectCategory: (cat: SkincareCategory | string) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: SkincareProduct) => void;
  onAddToCart: (product: SkincareProduct, size: string) => void;
  onQuickView: (product: SkincareProduct) => void;
}

export const ProductCatalogSection: React.FC<ProductCatalogSectionProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) => {
  const [selectedConcern, setSelectedConcern] = useState<SkinConcern>('All Concerns');
  const [sortBy, setSortBy] = useState<string>('featured');

  const categories: { label: string; value: string }[] = [
    { label: 'All Products', value: 'All Products' },
    { label: 'Sunscreens', value: 'Sunscreens' },
    { label: 'Moisturizers', value: 'Moisturizers' },
    { label: 'Face Serums', value: 'Face Serums' },
    { label: 'Face Washes', value: 'Face Washes' },
    { label: 'Lip Care', value: 'Lip Care' },
    { label: 'Toners', value: 'Toners' },
    { label: 'Body Care', value: 'Body Care' },
    { label: 'Skincare Combos', value: 'Skincare Combos' },
  ];

  const concerns: SkinConcern[] = [
    'All Concerns',
    'Dullness & Glow',
    'Sun Protection',
    'Dryness & Dehydration',
    'Acne & Active Pores',
    'Damaged Barrier',
    'Dark Spots & Pigmentation',
  ];

  // Filtering and Sorting
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (selectedCategory === 'NEW_ARRIVALS') {
      result = result.filter((p) => p.isNew);
    } else if (selectedCategory === 'BESTSELLERS') {
      result = result.filter((p) => p.isBestseller);
    } else if (selectedCategory !== 'All Products') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Concern Filter
    if (selectedConcern !== 'All Concerns') {
      result = result.filter((p) => p.primaryConcern === selectedConcern);
    }

    // Sort
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
        // 'featured'
        break;
    }

    return result;
  }, [products, selectedCategory, selectedConcern, sortBy]);

  const handleResetFilters = () => {
    onSelectCategory('All Products');
    setSelectedConcern('All Concerns');
    setSortBy('featured');
  };

  return (
    <section id="shop-catalog" className="py-12 sm:py-16 bg-[#FAF7F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF6584] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Clinically Tested • Fruit Powered</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1E1B1D] tracking-tight">
              Our Skincare Collection
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6E75] mt-1">
              Clean ingredients, zero toxic fillers, and delicious textures your skin will crave.
            </p>
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <span className="text-xs font-semibold text-[#7A6E75] flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#EFE5E0] hover:border-[#FFD1DC] text-[#2D2A2E] text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6584]/20 cursor-pointer shadow-xs"
            >
              <option value="featured">Featured & Popular</option>
              <option value="bestseller">Bestsellers First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>

        {/* Category Tabs (Segmented Button Controls) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-4">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => onSelectCategory(cat.value)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#1E1B1D] text-white shadow-sm scale-[1.02]'
                    : 'bg-white text-[#52474E] hover:text-[#1E1B1D] border border-[#EFE5E0] hover:border-[#FFD1DC]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Concern Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6">
          <span className="text-xs font-bold text-[#8C828A] shrink-0 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3" /> Concern:
          </span>
          {concerns.map((concern) => {
            const isActive = selectedConcern === concern;
            return (
              <button
                key={concern}
                onClick={() => setSelectedConcern(concern)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#FFE5EC] text-[#E11D48] border border-[#FFD1DC]'
                    : 'bg-white/80 text-[#6B5E66] hover:bg-white border border-[#EFE5E0]'
                }`}
              >
                {concern}
              </button>
            );
          })}
        </div>

        {/* Results Counter & Active Filter Tags */}
        <div className="flex items-center justify-between text-xs text-[#7A6E75] mb-6 pb-3 border-b border-[#F0E6E1]">
          <div>
            Showing <strong className="text-[#1E1B1D]">{filteredProducts.length}</strong> skincare formulas
            {(selectedCategory !== 'All Products' || selectedConcern !== 'All Concerns') && (
              <span className="ml-2 text-[#FF6584]">
                for {selectedCategory !== 'All Products' ? selectedCategory : ''}{' '}
                {selectedConcern !== 'All Concerns' ? `• ${selectedConcern}` : ''}
              </span>
            )}
          </div>

          {(selectedCategory !== 'All Products' || selectedConcern !== 'All Concerns' || sortBy !== 'featured') && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-[#E11D48] hover:underline font-semibold cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              Reset Filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
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
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#EFE5E0] p-8 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-full bg-[#FFE5EC] text-[#FF6584] flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1E1B1D] mb-1">No products found</h3>
            <p className="text-xs text-[#7A6E75] mb-4">
              No products match both "{selectedCategory}" and concern "{selectedConcern}".
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-[#1E1B1D] text-white text-xs font-bold hover:bg-[#3D3338] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
