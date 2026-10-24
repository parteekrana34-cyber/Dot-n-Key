import React, { useState } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { Product } from '../types/jewellery';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.materials.toLowerCase().includes(query.toLowerCase()) ||
          p.gemstone.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelect = (product: Product) => {
    onSelectProduct(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4 pb-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#FAF7F2] max-w-2xl w-full border border-[#DDD3C7] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#EAE3D8] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#8C6D46] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search by gemstone, ring, diamond, karat, or collection..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-[#2A2421] placeholder-[#9E9086] focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#8C7B70] hover:text-[#2A2421] px-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-[#6E6056] hover:text-[#2A2421] hover:bg-[#F2ECE2] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results / Suggestions */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#8C7B70] font-semibold mb-3">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {['Solitaire Ring', 'Tennis Bracelet', '18K Yellow Gold', 'Bridal Suite', 'South Sea Pearl', 'Emerald Cut'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 text-xs bg-[#F2EDE4] hover:bg-[#E8DFD3] text-[#5A4D45] transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              <p className="text-xs text-[#8C7B70]">
                Found <strong className="text-[#2A2421] tabular-nums">{results.length}</strong> matching creations
              </p>
              <div className="divide-y divide-[#EDE6DC]">
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelect(product)}
                    className="py-3.5 flex items-center justify-between cursor-pointer group hover:bg-[#F4EFE6]/60 px-2 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover bg-[#ECE4D8] border border-[#E0D5C7]"
                      />
                      <div>
                        <p className="font-serif text-base text-[#2A2421] group-hover:text-[#8C6D46] transition-colors font-medium">
                          {product.name}
                        </p>
                        <p className="text-[11px] text-[#7A6C63]">{product.category} · {product.materials}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-[#2A2421] tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-[#7A6C63]">
              <p className="font-serif text-lg text-[#2A2421]">No Creations Found</p>
              <p className="text-xs mt-1">Try refining with terms like "diamond", "gold", or "ring".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
