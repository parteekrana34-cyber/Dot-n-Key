import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, Sun, ArrowRight } from 'lucide-react';
import { SunscreenProduct } from '../../types/sunscreen';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: SunscreenProduct[];
  onSelectProduct: (product: SunscreenProduct) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return products.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchSubtitle = p.subtitle.toLowerCase().includes(q);
      const matchTagline = p.tagline.toLowerCase().includes(q);
      const matchIng = p.keyIngredients.some((i) => i.name.toLowerCase().includes(q));
      const matchFinish = p.finish.toLowerCase().includes(q);
      const matchSpf = p.spfRating.toLowerCase().includes(q);
      return matchName || matchSubtitle || matchTagline || matchIng || matchFinish || matchSpf;
    });
  }, [products, query]);

  if (!isOpen) return null;

  const popularKeywords = ['Watermelon', 'Vitamin C', 'Cica Mattifying', 'SPF 50+', 'Ceramides', 'Stick'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-24 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#F5D5DE] flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#F5D5DE] bg-[#FCEEF2] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#FF8C9A] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search sunscreens (e.g. Watermelon, Vitamin C, Matte, SPF 50+)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-[#633D4B] font-bold placeholder:text-[#8E6B78] placeholder:font-normal focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full hover:bg-white text-[#8E6B78] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-bold text-[#8E6B78] hover:text-[#633D4B] px-2 py-1 rounded-lg hover:bg-white cursor-pointer ml-1"
          >
            Cancel
          </button>
        </div>

        {/* Popular searches suggestions */}
        {!query && (
          <div className="p-4 sm:p-6 space-y-3 bg-white">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#8E6B78]">
              Popular Sunscreen Searches:
            </span>
            <div className="flex flex-wrap gap-2">
              {popularKeywords.map((kw) => (
                <button
                  key={kw}
                  onClick={() => setQuery(kw)}
                  className="px-3 py-1.5 rounded-full bg-[#FCEEF2] hover:bg-[#F9DDE5] border border-[#F5D5DE] text-xs font-bold text-[#633D4B] hover:text-[#FF8C9A] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Sun className="w-3 h-3 text-[#FF8C9A]" />
                  <span>{kw}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query && (
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5 bg-white">
            {searchResults.length === 0 ? (
              <div className="text-center py-10 space-y-2">
                <p className="font-bold text-sm text-[#633D4B]">No matching sunscreens found</p>
                <p className="text-xs text-[#8E6B78]">
                  Try searching for "Watermelon", "Cica", or "SPF 50+"
                </p>
              </div>
            ) : (
              searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#FCEEF2] border border-transparent hover:border-[#F5D5DE] transition-all cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 shadow-xs bg-[#FCEEF2]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black uppercase text-[#633D4B] bg-[#F9DDE5] border border-[#F5D5DE] px-2 py-0.5 rounded-full">
                        {product.spfRating} {product.paRating}
                      </span>
                      <span className="text-[10px] text-[#15803D] font-bold">
                        Zero White Cast
                      </span>
                    </div>
                    <h4 className="font-black text-xs sm:text-sm text-[#633D4B] truncate mt-0.5">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-[#8E6B78] truncate">{product.tagline}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-black text-sm text-[#633D4B]">₹{product.price}</span>
                    <ArrowRight className="w-4 h-4 text-[#FF8C9A] ml-auto mt-1" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
