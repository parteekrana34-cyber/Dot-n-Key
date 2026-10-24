import React from 'react';
import { Star, Heart, Eye, ShoppingBag, Zap } from 'lucide-react';
import { Product } from '../types/jewellery';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
}) => {
  return (
    <div className="group relative bg-[#FAF7F2] border border-[#E7DFD4] hover-luxury-lift hover:border-[#C5A880] hover:shadow-xl hover:shadow-[#C5A880]/15 flex flex-col justify-between will-change-transform">
      {/* Image Container */}
      <div 
        onClick={() => onSelectProduct(product)}
        className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-[#EFE8DD] cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Badges - Subtle text tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNew && (
            <span className="bg-[#2A2421] text-[#FAF7F2] text-[10px] tracking-[0.16em] uppercase px-2.5 py-1 font-semibold">
              NEW
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-[#C5A880] text-[#1E1917] text-[10px] tracking-[0.16em] uppercase px-2.5 py-1 font-semibold">
              BESTSELLER
            </span>
          )}
          {product.isSignature && (
            <span className="bg-[#8C6D46] text-[#FAF7F2] text-[10px] tracking-[0.16em] uppercase px-2.5 py-1 font-semibold">
              SIGNATURE
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-xs transition-all duration-200 z-10 ${
            isWishlisted
              ? 'bg-[#8C6D46] text-white shadow-md'
              : 'bg-white/85 text-[#2A2421] hover:bg-white hover:text-[#8C6D46] shadow-sm'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-150 ${
              isWishlisted ? 'fill-current scale-110' : ''
            }`}
          />
        </button>

        {/* Quick View Hover Strip */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#2A2421]/70 via-[#2A2421]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2 px-3 bg-[#FAF7F2] text-[#2A2421] hover:bg-[#C5A880] hover:text-white text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-md"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div onClick={() => onSelectProduct(product)} className="cursor-pointer">
          <div className="flex items-center justify-between text-[11px] text-[#8C7B70] uppercase tracking-wider mb-1.5">
            <span>{product.category}</span>
            <div className="flex items-center gap-1 text-[#2A2421] font-semibold">
              <Star className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" />
              <span className="tabular-nums">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="font-serif text-lg sm:text-xl text-[#2A2421] font-medium tracking-tight group-hover:text-[#8C6D46] transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-[#7A6C63] font-light line-clamp-2 min-h-[2rem] leading-relaxed">
            {product.subtitle}
          </p>

          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="text-base sm:text-lg font-semibold text-[#2A2421] font-sans tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#9E9086] line-through tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons: Add to Cart & Buy Now with full visible text */}
        <div className="mt-4 pt-4 border-t border-[#EDE6DC] grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="w-full py-2.5 px-2 border border-[#2A2421] text-[#2A2421] hover:bg-[#2A2421] hover:text-[#FAF7F2] text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 focus:outline-none text-center whitespace-nowrap"
            title="Add to Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Add to Cart</span>
          </button>
          
          <button
            type="button"
            onClick={() => onBuyNow(product)}
            className="w-full py-2.5 px-2 bg-[#C5A880] text-[#1E1917] hover:bg-[#B49467] text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm focus:outline-none text-center whitespace-nowrap"
            title="Buy Now"
          >
            <Zap className="w-3.5 h-3.5 fill-current shrink-0" />
            <span className="whitespace-nowrap">Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
