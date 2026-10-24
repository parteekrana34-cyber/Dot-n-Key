import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { SunscreenProduct } from '../../types/sunscreen';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: SunscreenProduct[];
  onRemoveFromWishlist: (product: SunscreenProduct) => void;
  onAddToCart: (product: SunscreenProduct, size: string) => void;
  onShopSunscreens: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onShopSunscreens,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#FCEEF2] h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#F5D5DE]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#F9DDE5] via-[#FCEEF2] to-[#F9DDE5] border-b border-[#F5D5DE] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FF8C9A] text-white flex items-center justify-center shadow-xs">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h2 className="font-black text-base text-[#633D4B] font-display">Your Wishlist</h2>
              <p className="text-[11px] text-[#8E6B78]">
                {wishlistProducts.length} {wishlistProducts.length === 1 ? 'sunscreen saved' : 'sunscreens saved'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#F9DDE5] text-[#8E6B78] hover:text-[#633D4B] flex items-center justify-center cursor-pointer shadow-xs border border-[#F5D5DE] transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-white text-[#FF8C9A] flex items-center justify-center mx-auto border border-[#F5D5DE] shadow-xs">
                <Heart className="w-8 h-8 text-[#FF8C9A]" />
              </div>
              <div>
                <h3 className="font-black text-base text-[#633D4B] font-display">No Sunscreens Saved</h3>
                <p className="text-xs text-[#8E6B78] max-w-xs mx-auto mt-1">
                  Save your favorite SPF 50+ formulas here to keep track of your glow favorites!
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onShopSunscreens();
                }}
                className="px-6 py-3 rounded-2xl bg-[#FF8C9A] hover:bg-[#FF7586] text-white text-xs font-black shadow-md cursor-pointer transition-all"
              >
                Explore Sunscreens
              </button>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-3 p-3.5 rounded-2xl bg-white border border-[#F5D5DE] shadow-xs relative group"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 rounded-xl object-cover bg-[#FCEEF2] border border-[#F5D5DE] shrink-0"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="pr-6">
                    <span className="text-[9px] font-black uppercase text-[#633D4B] bg-[#FCEEF2] px-2 py-0.5 rounded-full border border-[#F5D5DE]">
                      {product.spfRating} {product.paRating}
                    </span>
                    <h4 className="font-black text-xs text-[#633D4B] truncate mt-1">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-[#8E6B78]">{product.defaultSize}</p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-black text-sm text-[#633D4B]">
                        ₹{product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-[10px] text-[#8E6B78] line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        onAddToCart(product, product.defaultSize);
                        onRemoveFromWishlist(product);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#FF8C9A] hover:bg-[#FF7586] text-white text-[11px] font-black flex items-center gap-1 shadow-xs hover:shadow-md cursor-pointer transition-all"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveFromWishlist(product)}
                  className="absolute top-2.5 right-2.5 text-[#8E6B78] hover:text-[#FF8C9A] transition-colors cursor-pointer"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-4 bg-white border-t border-[#F5D5DE]">
            <button
              onClick={() => {
                wishlistProducts.forEach((p) => onAddToCart(p, p.defaultSize));
                onClose();
              }}
              className="w-full py-3.5 rounded-2xl bg-[#633D4B] hover:bg-[#7D4E5E] text-white text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Move All to Bag</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
