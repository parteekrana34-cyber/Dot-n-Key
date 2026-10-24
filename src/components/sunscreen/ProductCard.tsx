import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Check, Star, Sparkles, Sun } from 'lucide-react';
import { SunscreenProduct } from '../../types/sunscreen';

interface ProductCardProps {
  product: SunscreenProduct;
  isWishlisted: boolean;
  onToggleWishlist: (product: SunscreenProduct) => void;
  onAddToCart: (product: SunscreenProduct, size: string) => void;
  onQuickView: (product: SunscreenProduct) => void;
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
      className="group relative flex flex-col justify-between rounded-3xl bg-white border border-[#F5D5DE] hover:border-[#FF8C9A] p-3.5 sm:p-4 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer h-full"
    >
      <div>
        {/* Image Container with Badges */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#FCEEF2] mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />

          {/* Top Left Floating Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            {/* SPF Rating Pill */}
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-white/95 text-[#633D4B] shadow-xs border border-[#F5D5DE] flex items-center gap-1">
              <Sun className="w-2.5 h-2.5 text-[#FF8C9A] fill-[#FF8C9A]" />
              <span>{product.spfRating} {product.paRating}</span>
            </span>

            {product.isBestseller && (
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-wider uppercase bg-[#FF8C9A] text-white shadow-xs">
                Bestseller
              </span>
            )}

            {product.discountPercent > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-[#F9DDE5] text-[#633D4B] border border-[#F5D5DE] shadow-xs">
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
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white backdrop-blur-xs flex items-center justify-center text-[#8E6B78] hover:text-[#FF8C9A] transition-all shadow-xs z-10 cursor-pointer"
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-label="Wishlist toggle"
          >
            <Heart
              className={`w-4 h-4 transition-transform ${
                isWishlisted
                  ? 'fill-[#FF8C9A] text-[#FF8C9A] scale-110'
                  : 'text-[#8E6B78] hover:scale-110 hover:text-[#FF8C9A]'
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
              className="w-full py-2 rounded-xl bg-white/95 hover:bg-white text-[#633D4B] text-xs font-black shadow-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#F5D5DE]"
            >
              <Eye className="w-3.5 h-3.5 text-[#FF8C9A]" />
              <span>Quick View</span>
            </button>
          </div>
        </div>

        {/* Rating, Reviews & Zero White Cast tag */}
        <div className="flex items-center justify-between text-xs text-[#8E6B78] mb-1">
          <div className="flex items-center gap-1">
            <div className="flex items-center text-[#FF8C9A]">
              <Star className="w-3.5 h-3.5 fill-[#FF8C9A]" />
            </div>
            <span className="font-extrabold text-[#633D4B]">{product.rating}</span>
            <span className="text-[11px] text-[#8E6B78]">({product.reviewsCount.toLocaleString()})</span>
          </div>

          <span className="text-[10px] font-bold text-[#633D4B] bg-[#FCEEF2] border border-[#F5D5DE] px-2 py-0.5 rounded-full">
            Zero White Cast
          </span>
        </div>

        {/* Product Title in Dark Rose */}
        <h3 className="font-black text-sm sm:text-base text-[#633D4B] group-hover:text-[#FF8C9A] transition-colors line-clamp-1 leading-snug">
          {product.name}
        </h3>

        {/* Short Tagline / Benefit */}
        <p className="text-xs text-[#8E6B78] line-clamp-2 mt-1 leading-relaxed min-h-[32px]">
          {product.tagline}
        </p>

        {/* Key Actives Snippet */}
        <div className="mt-2 text-[11px] text-[#8E6B78] flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#FF8C9A] shrink-0" />
          <span className="truncate">{product.keyIngredients[0]?.name}</span>
        </div>
      </div>

      {/* Bottom Section: Sizes, Price, Add to Cart */}
      <div className="mt-3 pt-3 border-t border-[#F5D5DE]">
        {/* Size Selection (if multiple sizes available) */}
        {product.sizes.length > 1 && (
          <div className="flex items-center gap-1.5 mb-2.5 overflow-x-auto pb-0.5 scrollbar-none">
            {product.sizes.map((s) => (
              <button
                key={s.size}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(s.size);
                }}
                className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedSize === s.size
                    ? 'bg-[#633D4B] text-white shadow-xs'
                    : 'bg-[#FCEEF2] text-[#8E6B78] hover:bg-[#F9DDE5] hover:text-[#633D4B]'
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
              <span className="text-base sm:text-lg font-black text-[#633D4B]">
                ₹{activeSizeObj.price}
              </span>
              {activeSizeObj.originalPrice > activeSizeObj.price && (
                <span className="text-xs text-[#8E6B78] line-through font-medium">
                  ₹{activeSizeObj.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[9px] text-[#8E6B78] font-semibold">Taxes included</span>
          </div>

          {/* Add to Cart Button in Coral Pink */}
          <button
            onClick={handleAddToCart}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-md ${
              isAdded
                ? 'bg-[#633D4B] text-white'
                : 'bg-[#FF8C9A] hover:bg-[#FF7586] text-white shadow-[#FF8C9A]/30 active:scale-95'
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
