import React, { useState, useMemo } from 'react';
import { ArrowUpDown, Sparkles } from 'lucide-react';
import { PerfumeProduct } from '../../types/perfume';
import { ProductCard } from './ProductCard';
import { FRAGRANCE_FAMILIES } from '../../data/perfumeCatalog';
import { useTheme } from '../../context/ThemeContext';

interface ProductCatalogSectionProps {
  products: PerfumeProduct[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: PerfumeProduct) => void;
  onQuickView: (product: PerfumeProduct) => void;
  onSelectProduct: (product: PerfumeProduct) => void;
  onAddToCart: (product: PerfumeProduct, size: string) => void;
}

export const ProductCatalogSection: React.FC<ProductCatalogSectionProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onSelectProduct,
  onAddToCart,
}) => {
  const { isLight } = useTheme();
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('All');

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Family filter
        if (selectedCategory !== 'All Scents') {
          if (selectedCategory === 'Unisex') {
            if (p.gender !== 'Unisex') return false;
          } else if (p.family !== selectedCategory) {
            return false;
          }
        }

        // Gender filter
        if (selectedGender !== 'All' && p.gender !== selectedGender) {
          return false;
        }

        // Size filter
        if (selectedSizeFilter !== 'All') {
          if (!p.availableSizes.includes(selectedSizeFilter)) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default featured: bestsellers & signatures first
        if (a.isSignature && !b.isSignature) return -1;
        if (!a.isSignature && b.isSignature) return 1;
        return 0;
      });
  }, [products, selectedCategory, selectedGender, selectedSizeFilter, sortBy]);

  return (
    <section
      id="product-catalog"
      className={`scroll-mt-24 py-20 sm:py-28 transition-colors duration-300 border-b ${
        isLight 
          ? 'bg-[#FAF7F2] border-[#9A742A]/20' 
          : 'bg-[#171515] border-[#C2A064]/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] uppercase tracking-[0.25em] font-sans ${
            isLight
              ? 'border-[#9A742A]/40 bg-[#FFFFFF] text-[#591D2D] shadow-sm'
              : 'border-[#C2A064]/40 bg-[#421C27]/40 text-[#DFC48E]'
          }`}>
            <Sparkles className={`w-3.5 h-3.5 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
            <span>The Complete Collection</span>
          </div>
          <h2 className={`font-serif text-3xl sm:text-5xl font-normal tracking-tight transition-colors ${
            isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'
          }`}>
            Haute Parfumerie Catalog
          </h2>
          <p className={`text-sm sm:text-base font-sans transition-colors ${
            isLight ? 'text-[#5C5456]' : 'text-[#A89F93]'
          }`}>
            Exquisite Extraits de Parfum hand-poured in numbered flacons. Filter by olfactory family, gender profile, or bottle volume.
          </p>
        </div>

        {/* Filter Pills Bar: Fragrance Families */}
        <div className={`flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-6 border-b ${
          isLight ? 'border-[#9A742A]/20' : 'border-[#C2A064]/15'
        }`}>
          {FRAGRANCE_FAMILIES.map((family) => {
            const isSelected = selectedCategory === family;
            return (
              <button
                key={family}
                onClick={() => onSelectCategory(family)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-sans uppercase tracking-wider transition-all duration-300 ${
                  isSelected
                    ? isLight
                      ? 'bg-[#1A1616] text-[#FAF7F2] font-semibold shadow-md'
                      : 'bg-gradient-to-r from-[#C2A064] to-[#DFC48E] text-[#171515] font-semibold shadow-md'
                    : isLight
                      ? 'bg-[#FFFFFF] text-[#5C5456] hover:text-[#1A1616] border border-[#E5D9C5] shadow-xs'
                      : 'bg-[#1E1A1B] text-[#A89F93] hover:text-[#F3EDE3] border border-[#C2A064]/20'
                }`}
              >
                {family}
              </button>
            );
          })}
        </div>

        {/* Secondary Filter & Sort Controls */}
        <div className={`flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg border mb-10 text-xs font-sans transition-colors ${
          isLight 
            ? 'bg-[#FFFFFF] border-[#E5D9C5] shadow-sm text-[#1A1616]' 
            : 'bg-[#1E1A1B] border-[#C2A064]/20 text-[#DFC48E]'
        }`}>
          {/* Gender Profile */}
          <div className="flex items-center gap-2">
            <span className={`uppercase tracking-wider ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
              Gender:
            </span>
            {['All', 'Unisex', 'For Him', 'For Her'].map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGender(g)}
                className={`px-3 py-1.5 rounded transition-colors ${
                  selectedGender === g
                    ? isLight
                      ? 'bg-[#591D2D] text-[#FAF7F2] font-medium'
                      : 'bg-[#421C27] text-[#DFC48E] border border-[#C2A064]'
                    : isLight
                      ? 'text-[#73696B] hover:text-[#1A1616]'
                      : 'text-[#A89F93] hover:text-[#F3EDE3]'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Volume Filter & Sort */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className={`uppercase tracking-wider ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
                Size:
              </span>
              <select
                value={selectedSizeFilter}
                onChange={(e) => setSelectedSizeFilter(e.target.value)}
                className={`border rounded px-2.5 py-1.5 text-xs focus:outline-none transition-colors ${
                  isLight
                    ? 'bg-[#FAF7F2] border-[#E5D9C5] text-[#1A1616]'
                    : 'bg-[#171515] border-[#C2A064]/30 text-[#F3EDE3]'
                }`}
              >
                <option value="All">All Volumes</option>
                <option value="30ml">30ml Travel</option>
                <option value="50ml">50ml Standard</option>
                <option value="100ml">100ml Flacon</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown className={`w-3.5 h-3.5 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className={`border rounded px-2.5 py-1.5 text-xs focus:outline-none transition-colors ${
                  isLight
                    ? 'bg-[#FAF7F2] border-[#E5D9C5] text-[#1A1616]'
                    : 'bg-[#171515] border-[#C2A064]/30 text-[#F3EDE3]'
                }`}
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Catalog Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <p className={`font-serif text-2xl ${isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'}`}>
              No fragrances match your filter criteria.
            </p>
            <button
              onClick={() => {
                onSelectCategory('All Scents');
                setSelectedGender('All');
                setSelectedSizeFilter('All');
              }}
              className={`text-xs font-sans uppercase tracking-widest hover:underline ${
                isLight ? 'text-[#9A742A]' : 'text-[#DFC48E]'
              }`}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
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
        )}
      </div>
    </section>
  );
};
