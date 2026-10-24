import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Check, Star, Sparkles } from 'lucide-react';
import { SkincareProduct } from '../../types/skincare';

interface ProductCardProps {
  product: SkincareProduct;
  isWishlisted: boolean;
  onToggleWishlist: (product: SkincareProduct) => void;
  onAddToCart: (product: SkincareProduct, size: string) => void;
  onQuickView: (product: SkincareProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.defaultSize);
  const [isAdded, setIsAdded] = useState(false);

  const activeSizeObj =
    product.sizes.find((s) => s.size === selectedSize) || product.sizes[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col justify-between rounded-3xl bg-white border border-[#EFE5E0] hover:border-[#FFD1DC] p-3.5 sm:p-4 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer"
    >
      <div>
        {/* Image Container with Badges */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#FAF7F5] mb-3.5">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />

          {/* Top Floating Tags */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            {product.isBestseller && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase bg-[#FF6584] text-white shadow-xs">
                Bestseller
              </span>
            )}
            {product.isNew && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase bg-[#22C55E] text-white shadow-xs">
                New
              </span>
            )}
            {product.discountPercent > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-white/95 text-[#E11D48] border border-[#FFD1DC] shadow-xs">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Top Right: Wishlist Heart */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white backdrop-blur-xs flex items-center justify-center text-[#4A4146] hover:text-[#FF6584] transition-all shadow-xs z-10 cursor-pointer"
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-label="Wishlist toggle"
          >
            <Heart
              className={`w-4 h-4 transition-transform ${
                isWishlisted
                  ? 'fill-[#FF6584] text-[#FF6584] scale-110'
                  : 'text-[#4A4146] hover:scale-110'
              }`}
            />
          </button>

          {/* Quick View Button (hover reveal on desktop) */}
          <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="w-full py-2 rounded-xl bg-white/95 hover:bg-white text-[#2D2A2E] text-xs font-bold shadow-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#FF6584]" />
              <span>Quick View</span>
            </button>
          </div>
        </div>

        {/* Rating & Review Count (clearly marked demo data) */}
        <div className="flex items-center justify-between text-xs text-[#7A6E75] mb-1">
          <div className="flex items-center gap-1">
            <div className="flex items-center text-[#F59E0B]">
              <Star className="w-3.5 h-3.5 fill-[#F59E0B]" />
            </div>
            <span className="font-bold text-[#2D2A2E]">{product.rating}</span>
            <span className="text-[11px] text-[#8C828A]">({product.reviewsCount.toLocaleString()})</span>
          </div>

          {/* Step tag */}
          <span className="text-[10px] font-semibold text-[#8C828A]">
            {product.routineStep} • {product.timeOfDay}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="font-bold text-sm sm:text-base text-[#1E1B1D] group-hover:text-[#FF6584] transition-colors line-clamp-1 leading-snug">
          {product.name}
        </h3>

        {/* Subtitle / Short Description */}
        <p className="text-xs text-[#6B5E66] line-clamp-2 mt-1 leading-relaxed min-h-[32px]">
          {product.tagline}
        </p>

        {/* Key Actives Snippet */}
        <div className="mt-2 text-[11px] text-[#7A6E75] flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#F59E0B] shrink-0" />
          <span className="truncate">{product.keyIngredients[0]?.name}</span>
        </div>
      </div>

      {/* Bottom Section: Sizes, Price, Add to Cart */}
      <div className="mt-3.5 pt-3 border-t border-[#F5EFEA]">
        {/* Size Selection (if multiple sizes available) */}
        {product.sizes.length > 1 && (
          <div className="flex items-center gap-1.5 mb-2.5 overflow-x-auto pb-0.5">
            {product.sizes.map((s) => (
              <button
                key={s.size}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(s.size);
                }}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                  selectedSize === s.size
                    ? 'bg-[#1E1B1D] text-white shadow-xs'
                    : 'bg-[#FAF7F5] text-[#6B5E66] hover:bg-[#F0E6E1]'
                }`}
              >
                {s.size}
              </button>
            ))}
          </div>
        )}

        {/* Price & Add to Cart row */}
        <div className="flex items-center justify-between gap-2">
          {/* Price */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-[#1E1B1D]">
                ₹{activeSizeObj.price}
              </span>
              {activeSizeObj.originalPrice > activeSizeObj.price && (
                <span className="text-xs text-[#9C929A] line-through font-medium">
                  ₹{activeSizeObj.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#22C55E] font-bold">Inclusive of all taxes</span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-xs ${
              isAdded
                ? 'bg-[#22C55E] text-white'
                : 'bg-gradient-to-r from-[#FF6584] to-[#F43F5E] hover:from-[#F43F5E] hover:to-[#E11D48] text-white active:scale-95'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
