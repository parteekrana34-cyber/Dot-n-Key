import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types/jewellery';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (p: Product) => void;
  onMoveToCart: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
  onExploreCollection: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onMoveToCart,
  onSelectProduct,
  onExploreCollection,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#DDD3C7] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#EAE3D8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#8C6D46] fill-[#8C6D46]" />
            <h2 className="font-serif text-2xl text-[#2A2421] font-medium tracking-tight">
              Saved Pieces
            </h2>
            <span className="text-xs text-[#8C7B70] tabular-nums font-semibold">
              ({wishlistProducts.length})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#6E6056] hover:text-[#2A2421] hover:bg-[#F2ECE2] rounded-full transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {wishlistProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <Heart className="w-12 h-12 text-[#C5A880] mx-auto stroke-[1.2]" />
              <p className="font-serif text-2xl text-[#2A2421]">No Saved Jewels</p>
              <p className="text-xs text-[#7A6C63] max-w-xs mx-auto leading-relaxed">
                Tap the heart on any creation to save pieces you admire for upcoming celebrations or gift registries.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreCollection();
                }}
                className="mt-4 px-6 py-3 bg-[#2A2421] text-[#FAF7F2] text-xs uppercase tracking-wider font-semibold hover:bg-[#8C6D46] transition-colors"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 pb-6 border-b border-[#EDE6DC] last:border-0"
              >
                <div 
                  onClick={() => {
                    onClose();
                    onSelectProduct(product);
                  }}
                  className="w-20 h-20 bg-[#EFE8DD] shrink-0 border border-[#E0D5C7] overflow-hidden cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3
                        onClick={() => {
                          onClose();
                          onSelectProduct(product);
                        }}
                        className="font-serif text-base text-[#2A2421] font-medium leading-snug cursor-pointer hover:text-[#8C6D46] transition-colors"
                      >
                        {product.name}
                      </h3>
                      <button
                        onClick={() => onRemoveFromWishlist(product)}
                        className="text-[#9E9086] hover:text-red-700 p-1 transition-colors"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs font-semibold text-[#2A2421] tabular-nums mt-1">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onMoveToCart(product)}
                      className="w-full py-1.5 px-3 bg-[#2A2421] text-white hover:bg-[#8C6D46] text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-6 bg-[#FAF7F2] border-t border-[#EAE3D8]">
            <button
              onClick={() => {
                wishlistProducts.forEach((p) => onMoveToCart(p));
              }}
              className="w-full py-3.5 bg-[#C5A880] text-[#1E1917] hover:bg-[#B49467] text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-sm"
            >
              Move All to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
