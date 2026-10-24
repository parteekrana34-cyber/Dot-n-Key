import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Tag } from 'lucide-react';
import { PerfumeProduct } from '../../types/perfume';
import { PERFUME_CATALOG } from '../../data/perfumeCatalog';
import { useTheme } from '../../context/ThemeContext';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: PerfumeProduct) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const { isLight } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const trimmed = searchTerm.trim().toLowerCase();

  const filteredProducts = trimmed
    ? PERFUME_CATALOG.filter((p) => {
        const matchesName = p.name.toLowerCase().includes(trimmed);
        const matchesFamily = p.family.toLowerCase().includes(trimmed);
        const matchesDesc = p.description.toLowerCase().includes(trimmed);
        const matchesNotes = [
          ...p.notes.top,
          ...p.notes.heart,
          ...p.notes.base,
        ].some((n) => n.toLowerCase().includes(trimmed));
        return matchesName || matchesFamily || matchesDesc || matchesNotes;
      })
    : [];

  const suggestedTags = ['Oud', 'Rose', 'Amber', 'Bergamot', 'Vanilla', 'Leather', 'Citrus', 'Extrait'];

  return (
    <div className={`fixed inset-0 z-50 flex flex-col backdrop-blur-2xl animate-fade-in p-4 sm:p-8 transition-colors ${
      isLight 
        ? 'bg-[#FAF7F2]/95 text-[#1A1616]' 
        : 'bg-black/90 text-[#F3EDE3]'
    }`}>
      {/* Search Header */}
      <div className={`max-w-4xl mx-auto w-full flex items-center justify-between pb-6 border-b ${
        isLight ? 'border-[#E5D9C5]' : 'border-[#C2A064]/25'
      }`}>
        <div className="flex items-center gap-3 flex-1 mr-4">
          <Search className={`w-6 h-6 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by fragrance, note (e.g. oud, amber, rose) or family..."
            className={`w-full bg-transparent text-xl sm:text-2xl font-serif focus:outline-none ${
              isLight 
                ? 'text-[#1A1616] placeholder:text-[#968D8E]' 
                : 'text-[#F3EDE3] placeholder:text-[#A89F93]/50'
            }`}
          />
        </div>

        <button
          onClick={onClose}
          className={`p-2 rounded-full transition-colors ${
            isLight
              ? 'text-[#73696B] hover:text-[#1A1616] hover:bg-[#F4EFE6]'
              : 'text-[#A89F93] hover:text-[#F3EDE3] hover:bg-[#421C27]'
          }`}
          aria-label="Close search"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Suggested Quick Tags */}
      <div className="max-w-4xl mx-auto w-full py-4 flex flex-wrap items-center gap-2">
        <span className={`text-xs uppercase font-sans tracking-widest mr-2 flex items-center gap-1 ${
          isLight ? 'text-[#73696B]' : 'text-[#A89F93]'
        }`}>
          <Tag className={`w-3 h-3 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
          Popular Notes:
        </span>
        {suggestedTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSearchTerm(tag)}
            className={`px-3 py-1 rounded-full text-xs font-sans transition-colors border ${
              isLight
                ? 'bg-[#FFFFFF] text-[#591D2D] border-[#E5D9C5] hover:border-[#9A742A] hover:bg-[#FAF7F2]'
                : 'bg-[#1E1A1B] text-[#DFC48E] border-[#C2A064]/25 hover:border-[#C2A064] hover:bg-[#421C27]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Results Grid */}
      <div className="max-w-4xl mx-auto w-full flex-1 overflow-y-auto py-6">
        {trimmed && filteredProducts.length === 0 && (
          <div className="text-center py-16 space-y-2">
            <p className="font-serif text-2xl">No fragrances found</p>
            <p className={`text-sm font-sans ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
              Try searching for "Oud", "Rose", "Amber", or "Woody".
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                onSelectProduct(p);
                onClose();
              }}
              className={`p-4 rounded-lg border cursor-pointer flex gap-3 items-center group transition-all ${
                isLight
                  ? 'bg-[#FFFFFF] border-[#E5D9C5] hover:border-[#9A742A] shadow-xs hover:shadow-md'
                  : 'bg-[#1E1A1B] border-[#C2A064]/20 hover:border-[#C2A064]'
              }`}
            >
              <img
                src={p.image}
                alt={p.name}
                className={`w-14 h-14 rounded object-cover border shrink-0 ${
                  isLight ? 'border-[#E5D9C5]' : 'border-[#C2A064]/20'
                }`}
                referrerPolicy="no-referrer"
              />

              <div className="overflow-hidden flex-1">
                <h4 className={`font-serif text-base truncate transition-colors ${
                  isLight ? 'text-[#1A1616] group-hover:text-[#9A742A]' : 'text-[#F3EDE3] group-hover:text-[#DFC48E]'
                }`}>
                  {p.name}
                </h4>
                <p className={`text-xs font-sans ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`}>
                  {p.family} • {p.defaultSize}
                </p>
                <p className={`font-serif text-sm font-medium ${isLight ? 'text-[#9A742A]' : 'text-[#DFC48E]'}`}>
                  ₹{p.price.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
