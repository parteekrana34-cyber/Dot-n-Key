import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { PerfumeProduct } from '../../types/perfume';
import { useTheme } from '../../context/ThemeContext';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: PerfumeProduct[];
  onRemoveFromWishlist: (product: PerfumeProduct) => void;
  onAddToCart: (product: PerfumeProduct, size: string) => void;
  onSelectProduct: (product: PerfumeProduct) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  const { isLight } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className={`w-screen max-w-md border-l shadow-2xl flex flex-col transition-colors ${
          isLight
            ? 'bg-[#FFFFFF] border-[#E5D9C5] text-[#1A1616]'
            : 'bg-[#171515] border-[#C2A064]/35 text-[#F3EDE3]'
        }`}>
          {/* Header */}
          <div className={`p-6 border-b flex items-center justify-between ${
            isLight ? 'bg-[#FAF7F2] border-[#E5D9C5]' : 'bg-[#1E1A1B] border-[#C2A064]/20'
          }`}>
            <div className="flex items-center gap-2">
              <Heart className={`w-5 h-5 ${isLight ? 'fill-[#9A742A] text-[#9A742A]' : 'fill-[#C2A064] text-[#C2A064]'}`} />
              <h2 className="font-serif text-xl tracking-wider font-normal">
                Saved Masterpieces
              </h2>
              <span className={`text-xs px-2 py-0.5 rounded-full font-sans ${
                isLight ? 'bg-[#591D2D] text-[#FAF7F2]' : 'bg-[#421C27] text-[#DFC48E]'
              }`}>
                {wishlistProducts.length}
              </span>
            </div>

            <button
              onClick={onClose}
              className={`p-1.5 rounded-full transition-colors ${
                isLight ? 'text-[#73696B] hover:text-[#1A1616] hover:bg-[#F4EFE6]' : 'text-[#A89F93] hover:text-[#F3EDE3] hover:bg-[#421C27]'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className={`w-16 h-16 rounded-full border flex items-center justify-center ${
                  isLight ? 'border-[#E5D9C5] bg-[#FAF7F2]' : 'border-[#C2A064]/30 bg-[#1E1A1B]'
                }`}>
                  <Heart className={`w-8 h-8 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]/60'}`} />
                </div>
                <h3 className="font-serif text-2xl">Your wishlist is empty</h3>
                <p className={`text-xs max-w-xs font-sans ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
                  Tap the heart on any fragrance to bookmark your favored creations.
                </p>
              </div>
            ) : (
              wishlistProducts.map((p) => (
                <div
                  key={p.id}
                  className={`p-4 rounded-lg border flex gap-4 items-center justify-between group transition-colors ${
                    isLight 
                      ? 'bg-[#FAF7F2] border-[#E5D9C5]' 
                      : 'bg-[#1E1A1B] border-[#C2A064]/20'
                  }`}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className={`w-16 h-16 rounded object-cover border shrink-0 cursor-pointer hover:opacity-90 ${
                      isLight ? 'border-[#E5D9C5]' : 'border-[#C2A064]/20'
                    }`}
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0 pr-2">
                    <h4
                      onClick={() => {
                        onSelectProduct(p);
                        onClose();
                      }}
                      className={`font-serif text-sm sm:text-base cursor-pointer truncate transition-colors ${
                        isLight ? 'hover:text-[#9A742A]' : 'hover:text-[#DFC48E]'
                      }`}
                    >
                      {p.name}
                    </h4>
                    <p className={`text-xs font-sans ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`}>
                      {p.family} • {p.defaultSize}
                    </p>
                    <p className={`font-serif text-sm mt-1 font-medium ${
                      isLight ? 'text-[#9A742A]' : 'text-[#DFC48E]'
                    }`}>
                      ₹{p.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => onRemoveFromWishlist(p)}
                      className={`p-1 hover:text-rose-600 transition-colors ${isLight ? 'text-[#968D8E]' : 'text-[#A89F93]'}`}
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        onAddToCart(p, p.defaultSize);
                      }}
                      className={`px-3 py-1.5 rounded font-sans font-semibold text-[11px] tracking-wider uppercase flex items-center gap-1 shadow-xs ${
                        isLight
                          ? 'bg-gradient-to-r from-[#1A1616] to-[#351B22] text-[#FAF7F2]'
                          : 'bg-gradient-to-r from-[#C2A064] to-[#DFC48E] text-[#171515] hover:brightness-110'
                      }`}
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
