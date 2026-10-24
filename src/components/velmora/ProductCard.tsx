import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { PerfumeProduct } from '../../types/perfume';
import { useTheme } from '../../context/ThemeContext';

interface ProductCardProps {
  product: PerfumeProduct;
  isWishlisted: boolean;
  onToggleWishlist: (product: PerfumeProduct) => void;
  onQuickView: (product: PerfumeProduct) => void;
  onSelectProduct: (product: PerfumeProduct) => void;
  onAddToCart: (product: PerfumeProduct, size: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onSelectProduct,
  onAddToCart,
}) => {
  const { isLight } = useTheme();
  const [selectedSize, setSelectedSize] = useState<string>(
    product.defaultSize || product.availableSizes[0] || '50ml'
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  const currentPrice = product.sizePrices[selectedSize] || product.price;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className={`group relative flex flex-col rounded-lg overflow-hidden transition-all duration-500 cursor-pointer ${
        isLight
          ? 'bg-[#FFFFFF] border border-[#E5D9C5] hover:border-[#9A742A]/60 shadow-[0_4px_20px_rgba(154,116,42,0.06)] hover:shadow-[0_15px_35px_rgba(154,116,42,0.14)]'
          : 'bg-[#1E1A1B] border border-[#C2A064]/25 hover:border-[#C2A064]/70 hover:shadow-[0_15px_40px_rgba(0,0,0,0.7)]'
      }`}
    >
      {/* Bottle Image Showcase Container */}
      <div className={`relative aspect-[4/4.5] w-full overflow-hidden transition-colors duration-300 ${
        isLight ? 'bg-[#F5EFE6]' : 'bg-[#171515]'
      }`}>
        {/* Subtle vignette gradient */}
        <div className={`absolute inset-0 z-10 pointer-events-none opacity-40 transition-colors ${
          isLight 
            ? 'bg-gradient-to-t from-[#FFFFFF]/60 via-transparent to-transparent' 
            : 'bg-gradient-to-t from-[#1E1A1B] via-transparent to-transparent'
        }`} />

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Badges: BESTSELLER / NEW / SIGNATURE */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
          {product.isSignature && (
            <span className={`px-2.5 py-1 rounded-sm text-[10px] tracking-[0.2em] uppercase font-sans font-semibold backdrop-blur-sm shadow-sm ${
              isLight
                ? 'bg-[#591D2D] text-[#FAF7F2] border border-[#591D2D]'
                : 'bg-[#421C27]/90 text-[#DFC48E] border border-[#C2A064]/40'
            }`}>
              Signature
            </span>
          )}
          {product.isBestseller && (
            <span className={`px-2.5 py-1 rounded-sm text-[10px] tracking-[0.2em] uppercase font-sans font-semibold backdrop-blur-sm shadow-sm ${
              isLight
                ? 'bg-[#FAF7F2]/95 text-[#9A742A] border border-[#9A742A]/40'
                : 'bg-[#171515]/90 text-[#C2A064] border border-[#C2A064]/50'
            }`}>
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className={`px-2.5 py-1 rounded-sm text-[10px] tracking-[0.2em] uppercase font-sans font-semibold backdrop-blur-sm shadow-sm ${
              isLight
                ? 'bg-[#2D4537] text-[#E8F5EE] border border-[#2D4537]'
                : 'bg-[#1F2C24]/90 text-[#A8D5BA] border border-[#A8D5BA]/30'
            }`}>
              New Arrival
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm shadow-md ${
            isLight
              ? 'bg-[#FFFFFF]/90 hover:bg-[#F4EFE6] border border-[#9A742A]/35 text-[#1A1616]'
              : 'bg-[#171515]/80 hover:bg-[#421C27] border border-[#C2A064]/40 text-[#F3EDE3] hover:text-[#C2A064]'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${
              isWishlisted
                ? isLight
                  ? 'fill-[#9A742A] text-[#9A742A] scale-110'
                  : 'fill-[#C2A064] text-[#C2A064] scale-110'
                : 'hover:scale-110'
            }`}
          />
        </button>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-x-3 bottom-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className={`w-full py-2.5 px-4 rounded font-sans text-xs tracking-[0.18em] uppercase font-medium flex items-center justify-center gap-2 shadow-lg backdrop-blur-md transition-all duration-200 ${
              isLight
                ? 'bg-[#FFFFFF]/95 hover:bg-[#591D2D] hover:text-[#FAF7F2] border border-[#9A742A]/50 text-[#1A1616]'
                : 'bg-[#171515]/90 hover:bg-[#421C27] border border-[#C2A064]/60 text-[#DFC48E]'
            }`}
          >
            <Eye className={`w-3.5 h-3.5 ${isLight ? 'text-[#9A742A] group-hover:text-white' : 'text-[#C2A064]'}`} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Details Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Family & Concentration */}
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider font-sans font-medium">
            <span className={isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}>{product.family}</span>
            <span className={isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}>{product.gender}</span>
          </div>

          {/* Product Name */}
          <h3 className={`font-serif text-lg sm:text-xl font-normal transition-colors mt-1.5 leading-snug ${
            isLight ? 'text-[#1A1616] group-hover:text-[#9A742A]' : 'text-[#F3EDE3] group-hover:text-[#DFC48E]'
          }`}>
            {product.name}
          </h3>

          {/* Subtitle / Concentration */}
          <p className={`text-xs font-sans mt-0.5 line-clamp-1 ${
            isLight ? 'text-[#73696B]' : 'text-[#A89F93]'
          }`}>
            {product.concentration}
          </p>

          {/* Key Notes Highlights */}
          <div className="mt-2.5 flex flex-wrap gap-1">
            {product.notes.top.slice(0, 2).map((note, idx) => (
              <span
                key={idx}
                className={`text-[10px] px-2 py-0.5 rounded-full font-sans border ${
                  isLight
                    ? 'bg-[#F5EFE6] text-[#4A4345] border-[#E5D9C5]'
                    : 'bg-[#171515] text-[#A89F93] border-[#C2A064]/15'
                }`}
              >
                {note}
              </span>
            ))}
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-sans border ${
                isLight
                  ? 'bg-[#F4EFE6] text-[#9A742A] border-[#9A742A]/30 font-medium'
                  : 'bg-[#171515] text-[#DFC48E] border-[#C2A064]/20'
              }`}
            >
              +{product.notes.heart.length + product.notes.base.length} notes
            </span>
          </div>
        </div>

        {/* Bottle Size Selector Tabs */}
        {product.availableSizes.length > 1 && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 pt-1"
          >
            {product.availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`text-[11px] px-2.5 py-1 rounded font-sans tracking-wide transition-all ${
                  selectedSize === size
                    ? isLight
                      ? 'bg-[#1A1616] text-[#FAF7F2] font-semibold shadow-sm'
                      : 'bg-[#C2A064] text-[#171515] font-semibold shadow-sm'
                    : isLight
                      ? 'bg-[#F5EFE6] text-[#5C5456] hover:text-[#1A1616] border border-[#E5D9C5]'
                      : 'bg-[#171515] text-[#A89F93] hover:text-[#F3EDE3] border border-[#C2A064]/20'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        {/* Pricing & Add to Bag Action */}
        <div className={`pt-2 border-t flex items-center justify-between gap-3 ${
          isLight ? 'border-[#E5D9C5]' : 'border-[#C2A064]/15'
        }`}>
          <div>
            <div className="flex items-baseline gap-2">
              <span className={`font-serif text-xl sm:text-2xl font-normal ${
                isLight ? 'text-[#9A742A] font-medium' : 'text-[#DFC48E]'
              }`}>
                ₹{currentPrice.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && selectedSize === product.defaultSize && (
                <span className={`text-xs line-through font-sans ${
                  isLight ? 'text-[#968D8E]' : 'text-[#A89F93]'
                }`}>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className={`text-[10px] font-sans block ${
              isLight ? 'text-[#73696B]' : 'text-[#A89F93]'
            }`}>
              Inclusive of all taxes
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`px-3.5 py-2.5 rounded text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 ${
              addedAnimation
                ? 'bg-emerald-700 text-white'
                : isLight
                  ? 'bg-gradient-to-r from-[#1A1616] via-[#351B22] to-[#1A1616] text-[#FAF7F2] hover:shadow-md'
                  : 'bg-gradient-to-r from-[#C2A064] to-[#DFC48E] text-[#171515] hover:brightness-110 shadow-sm'
            }`}
            title="Add to shopping bag"
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
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
