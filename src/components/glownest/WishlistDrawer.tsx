import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { SkincareProduct } from '../../types/skincare';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: SkincareProduct[];
  onRemoveFromWishlist: (product: SkincareProduct) => void;
  onAddToCart: (product: SkincareProduct, size: string) => void;
  onShopNow: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onShopNow,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#F0E6E1] flex items-center justify-between bg-[#FFF0F3]/40">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#FF6584] fill-[#FF6584]" />
            <h2 className="font-extrabold text-base sm:text-lg text-[#1E1B1D]">
              My Wishlist ({wishlistProducts.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white text-[#7A6E75] hover:text-[#1E1B1D] transition-colors cursor-pointer"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FFE5EC] flex items-center justify-center text-[#FF6584]">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-extrabold text-lg text-[#1E1B1D]">Your Wishlist is Empty</h3>
              <p className="text-xs text-[#7A6E75] max-w-xs">
                Tap the heart on any skincare product to save your favorites for later!
              </p>
              <button
                onClick={() => {
                  onClose();
                  onShopNow();
                }}
                className="px-6 py-2.5 rounded-xl bg-[#1E1B1D] text-white text-xs font-bold hover:bg-[#3D3338] transition-colors cursor-pointer"
              >
                Explore Products
              </button>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-3 p-3 rounded-2xl bg-[#FAF7F5] border border-[#EFE5E0] hover:border-[#FFD1DC] transition-all"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 rounded-xl object-cover bg-white shrink-0 shadow-xs"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-xs sm:text-sm text-[#1E1B1D] line-clamp-1">
                        {product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveFromWishlist(product)}
                        className="text-[#9C929A] hover:text-[#E11D48] p-1 transition-colors cursor-pointer"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-[#7A6E75] line-clamp-1">{product.subtitle}</p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#F0E6E1]/60">
                    <span className="font-black text-xs sm:text-sm text-[#1E1B1D]">
                      ₹{product.price}
                    </span>

                    <button
                      onClick={() => {
                        onAddToCart(product, product.defaultSize);
                        onRemoveFromWishlist(product);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FF6584] to-[#F43F5E] text-white text-[11px] font-extrabold flex items-center gap-1 shadow-xs hover:shadow-md transition-all cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-4 border-t border-[#F0E6E1] bg-white">
            <button
              onClick={() => {
                wishlistProducts.forEach((p) => onAddToCart(p, p.defaultSize));
                onClose();
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#1E1B1D] text-white font-bold text-xs sm:text-sm hover:bg-[#3D3338] transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Move All to Glow Bag</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
