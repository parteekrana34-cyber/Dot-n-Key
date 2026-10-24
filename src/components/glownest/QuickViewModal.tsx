import React, { useState } from 'react';
import {
  X,
  Heart,
  ShoppingBag,
  Star,
  Check,
  Sparkles,
  ShieldCheck,
  Clock,
  Droplets,
  Layers,
} from 'lucide-react';
import { SkincareProduct } from '../../types/skincare';

interface QuickViewModalProps {
  product: SkincareProduct | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: SkincareProduct) => void;
  onAddToCart: (product: SkincareProduct, size: string, quantity: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}) => {
  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.defaultSize);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'howToUse'>('benefits');
  const [isAdded, setIsAdded] = useState(false);

  const activeSizeObj =
    product.sizes.find((s) => s.size === selectedSize) || product.sizes[0];

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl sm:rounded-[2rem] shadow-2xl overflow-hidden border border-[#FFD1DC]/40 max-h-[92vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#4A4146] hover:text-[#FF6584] shadow-md flex items-center justify-center transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Product Photography & Badges */}
        <div className="md:w-5/12 bg-gradient-to-br from-[#FFF0F3] to-[#FAF7F5] p-6 flex flex-col justify-between items-center relative border-b md:border-b-0 md:border-r border-[#F0E6E1]">
          <div className="w-full flex justify-between items-center mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white px-2.5 py-1 rounded-full text-[#FF6584] shadow-xs">
              {product.category}
            </span>
            <button
              onClick={() => onToggleWishlist(product)}
              className="p-2 rounded-full bg-white/80 hover:bg-white text-[#4A4146] shadow-xs transition-colors cursor-pointer"
            >
              <Heart
                className={`w-4 h-4 ${
                  isWishlisted ? 'fill-[#FF6584] text-[#FF6584]' : 'text-[#4A4146]'
                }`}
              />
            </button>
          </div>

          {/* Product Image */}
          <div className="relative w-48 sm:w-60 aspect-square rounded-2xl overflow-hidden shadow-md my-auto">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Routine & Skin Type badge */}
          <div className="w-full mt-4 bg-white/80 rounded-2xl p-2.5 text-center text-xs text-[#52474E] border border-white">
            <p className="font-bold text-[#1E1B1D]">Routine Step: {product.routineStep}</p>
            <p className="text-[11px] text-[#7A6E75]">Best for: {product.skinType.join(', ')}</p>
          </div>
        </div>

        {/* Right Column: Information, Sizes, Actives, Quantity, Add to Cart */}
        <div className="md:w-7/12 p-6 sm:p-8 flex flex-col overflow-y-auto max-h-[75vh] md:max-h-[85vh]">
          {/* Header & Rating */}
          <div className="flex items-center gap-2 text-xs text-[#7A6E75] mb-1">
            <div className="flex items-center text-[#F59E0B]">
              <Star className="w-3.5 h-3.5 fill-[#F59E0B]" />
            </div>
            <span className="font-bold text-[#1E1B1D]">{product.rating}</span>
            <span>·</span>
            <span>{product.reviewsCount.toLocaleString()} verified reviews</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-[#1E1B1D] leading-snug">
            {product.name}
          </h2>
          <p className="text-xs font-semibold text-[#FF6584] mt-0.5">{product.subtitle}</p>

          {/* Price line */}
          <div className="flex items-baseline gap-2 mt-3 mb-4">
            <span className="text-2xl font-black text-[#1E1B1D]">₹{activeSizeObj.price}</span>
            {activeSizeObj.originalPrice > activeSizeObj.price && (
              <span className="text-sm text-[#9C929A] line-through">
                ₹{activeSizeObj.originalPrice}
              </span>
            )}
            {product.discountPercent > 0 && (
              <span className="text-xs font-bold bg-[#FFE5EC] text-[#E11D48] px-2 py-0.5 rounded-full">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#52474E] leading-relaxed mb-4">
            {product.description}
          </p>

          {/* Size Selection */}
          {product.sizes.length > 1 && (
            <div className="mb-4">
              <label className="block text-xs font-bold text-[#1E1B1D] mb-1.5">
                Select Size: <span className="text-[#FF6584]">{selectedSize}</span>
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s.size)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedSize === s.size
                        ? 'bg-[#1E1B1D] text-white shadow-xs'
                        : 'bg-[#FAF7F5] text-[#52474E] hover:bg-[#F0E6E1] border border-[#EFE5E0]'
                    }`}
                  >
                    {s.size} - ₹{s.price}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Key Actives Pill Box */}
          <div className="mb-5 bg-[#FAF7F5] rounded-2xl p-3 border border-[#EFE5E0]">
            <p className="text-xs font-bold text-[#1E1B1D] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              Superstar Active Ingredients:
            </p>
            <div className="space-y-1.5">
              {product.keyIngredients.map((ing) => (
                <div key={ing.name} className="flex items-start gap-1.5 text-xs text-[#52474E]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6584] mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-[#1E1B1D]">{ing.name}: </strong>
                    <span>{ing.benefit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs: Benefits / How to use / Clean standard */}
          <div className="border-t border-[#F0E6E1] pt-3 mb-4">
            <div className="flex border-b border-[#F0E6E1] gap-4 text-xs font-bold mb-2">
              <button
                onClick={() => setActiveTab('benefits')}
                className={`pb-1.5 cursor-pointer transition-colors ${
                  activeTab === 'benefits'
                    ? 'text-[#FF6584] border-b-2 border-[#FF6584]'
                    : 'text-[#7A6E75] hover:text-[#1E1B1D]'
                }`}
              >
                Key Benefits
              </button>
              <button
                onClick={() => setActiveTab('howToUse')}
                className={`pb-1.5 cursor-pointer transition-colors ${
                  activeTab === 'howToUse'
                    ? 'text-[#FF6584] border-b-2 border-[#FF6584]'
                    : 'text-[#7A6E75] hover:text-[#1E1B1D]'
                }`}
              >
                How To Use
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`pb-1.5 cursor-pointer transition-colors ${
                  activeTab === 'ingredients'
                    ? 'text-[#FF6584] border-b-2 border-[#FF6584]'
                    : 'text-[#7A6E75] hover:text-[#1E1B1D]'
                }`}
              >
                Clean Actives
              </button>
            </div>

            <div className="text-xs text-[#52474E] leading-relaxed">
              {activeTab === 'benefits' && (
                <ul className="space-y-1">
                  {product.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === 'howToUse' && (
                <div>
                  <p>{product.howToUse}</p>
                  <p className="mt-1 font-semibold text-[#8C828A]">Recommended Time: {product.timeOfDay}</p>
                </div>
              )}
              {activeTab === 'ingredients' && (
                <p className="text-[11px] text-[#7A6E75] font-mono leading-normal bg-white p-2 rounded-lg border border-[#F0E6E1]">
                  {product.fullIngredients}
                </p>
              )}
            </div>
          </div>

          {/* Quantity & Add to Cart button */}
          <div className="mt-auto pt-3 border-t border-[#F0E6E1] flex items-center gap-3">
            {/* Quantity Controls */}
            <div className="flex items-center border border-[#EFE5E0] rounded-xl bg-[#FAF7F5] p-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-7 h-7 flex items-center justify-center text-[#52474E] hover:text-[#1E1B1D] font-bold cursor-pointer"
              >
                -
              </button>
              <span className="w-8 text-center text-xs font-bold text-[#1E1B1D]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-7 h-7 flex items-center justify-center text-[#52474E] hover:text-[#1E1B1D] font-bold cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAdd}
              className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                isAdded
                  ? 'bg-[#22C55E] text-white'
                  : 'bg-gradient-to-r from-[#FF6584] to-[#F43F5E] hover:from-[#F43F5E] hover:to-[#E11D48] text-white active:scale-98'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag • ₹{activeSizeObj.price * quantity}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
