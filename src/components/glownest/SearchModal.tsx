import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, Sparkles, ArrowRight, Star } from 'lucide-react';
import { SkincareProduct } from '../../types/skincare';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: SkincareProduct[];
  onSelectProduct: (product: SkincareProduct) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const popularSearches = [
    'Watermelon Sunscreen',
    'Vitamin C',
    'Hyaluronic Acid',
    'Cica Gel',
    'Niacinamide',
    'Ceramides',
    'Strawberry Lip Balm',
  ];

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.primaryConcern.toLowerCase().includes(q) ||
        p.keyIngredients.some((k) => k.name.toLowerCase().includes(q))
    );
  }, [products, query]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#FFD1DC]/40">
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-[#F0E6E1] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#FF6584] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search skincare products, key actives, concerns..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm sm:text-base font-semibold text-[#1E1B1D] placeholder:text-[#9C929A] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full hover:bg-[#FAF7F5] text-[#9C929A] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-[#FAF7F5] text-xs font-bold text-[#52474E] hover:text-[#1E1B1D] cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Popular Tags */}
        <div className="p-4 bg-[#FFF0F3]/30 border-b border-[#F0E6E1]/60">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#7A6E75] mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#F59E0B]" /> Popular Searches:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-2.5 py-1 rounded-full bg-white text-[#52474E] hover:text-[#E11D48] hover:border-[#FFD1DC] border border-[#EFE5E0] text-xs font-medium transition-colors cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim() === '' ? (
            <div className="text-center py-10 text-[#7A6E75]">
              <p className="text-xs">Type a keyword to discover fresh skincare formulas.</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-10 text-[#7A6E75]">
              <p className="text-sm font-bold text-[#1E1B1D] mb-1">No products found for "{query}"</p>
              <p className="text-xs">Try searching for "Sunscreen", "Vitamin C", or "Moisturizer".</p>
            </div>
          ) : (
            <div className="space-y-2">
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-[#FAF7F5] border border-transparent hover:border-[#FFD1DC] transition-all cursor-pointer group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded-xl object-cover bg-[#FAF7F5] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[#1E1B1D] group-hover:text-[#FF6584] transition-colors truncate">
                        {product.name}
                      </h4>
                      <span className="text-[10px] font-semibold bg-[#FFE5EC] text-[#E11D48] px-2 py-0.5 rounded-full shrink-0">
                        {product.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#7A6E75] truncate mt-0.5">{product.tagline}</p>
                    <div className="flex items-center gap-2 text-xs text-[#52474E] mt-1">
                      <span className="font-extrabold text-[#1E1B1D]">₹{product.price}</span>
                      <span className="flex items-center text-[#F59E0B] text-[11px]">
                        <Star className="w-3 h-3 fill-[#F59E0B] mr-0.5" />
                        {product.rating}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#9C929A] group-hover:text-[#FF6584] group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
