import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Zap, ShieldCheck, Truck, RotateCcw, Check } from 'lucide-react';
import { Product } from '../types/jewellery';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  onAddToCart: (p: Product, quantity: number, metal: string, size?: string) => void;
  onBuyNow: (p: Product, quantity: number, metal: string, size?: string) => void;
  onOpenFullDetails: (p: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onOpenFullDetails,
}) => {
  if (!isOpen || !product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedMetal, setSelectedMetal] = useState<string>(product.availableMetals[0] || '18K Yellow Gold');
  const [selectedSize, setSelectedSize] = useState<string>(product.availableSizes ? product.availableSizes[0] : '');
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedMetal, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleBuy = () => {
    onBuyNow(product, quantity, selectedMetal, selectedSize);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#FAF7F2] max-w-4xl w-full border border-[#DDD3C7] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-[#FAF7F2]/80 hover:bg-[#2A2421] text-[#2A2421] hover:text-[#FAF7F2] transition-colors rounded-full focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery Column */}
          <div className="bg-[#EFE7DC] p-6 flex flex-col justify-between">
            <div className="relative aspect-square overflow-hidden bg-white/50 border border-[#E0D5C7]">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
                referrerPolicy="no-referrer"
              />

              {/* Wishlist Button */}
              <button
                onClick={() => onToggleWishlist(product)}
                className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-xs transition-colors ${
                  isWishlisted
                    ? 'bg-[#8C6D46] text-white'
                    : 'bg-white/80 text-[#2A2421] hover:bg-white hover:text-[#8C6D46]'
                }`}
                title={isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail switcher */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setActiveImage(product.image)}
                className={`w-16 h-16 border-2 overflow-hidden bg-white transition-all ${
                  activeImage === product.image ? 'border-[#C5A880]' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={product.image} alt="Thumbnail 1" className="w-full h-full object-cover" />
              </button>
              {product.secondaryImage && (
                <button
                  onClick={() => setActiveImage(product.secondaryImage!)}
                  className={`w-16 h-16 border-2 overflow-hidden bg-white transition-all ${
                    activeImage === product.secondaryImage ? 'border-[#C5A880]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={product.secondaryImage} alt="Thumbnail 2" className="w-full h-full object-cover" />
                </button>
              )}
            </div>
          </div>

          {/* Details & Actions Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto no-scrollbar">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#8C7B70] uppercase tracking-wider mb-1">
                <span>{product.category}</span>
                <div className="flex items-center gap-1.5 text-[#2A2421]">
                  <div className="flex text-[#C5A880]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-[#C5A880] text-[#C5A880]'
                            : 'text-[#DDD3C7]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold tabular-nums">{product.rating.toFixed(1)}</span>
                  <span>({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title & Price */}
              <h2 className="font-serif text-2xl sm:text-3xl text-[#2A2421] font-medium tracking-tight">
                {product.name}
              </h2>
              <p className="text-xs text-[#7A6C63] font-light mt-1">{product.subtitle}</p>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-semibold text-[#2A2421] font-sans tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#9E9086] line-through tabular-nums">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-[#8C6D46] font-medium">Includes Tax & Insurance</span>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-[#665950] font-light leading-relaxed">
                {product.description}
              </p>

              {/* Specifications Mini-Grid */}
              <div className="mt-5 p-3.5 bg-[#F4EFE6] border border-[#E7DFD4] text-xs space-y-1.5 text-[#5C4F46]">
                <div className="flex justify-between">
                  <span className="text-[#8C7B70]">Material:</span>
                  <span className="font-medium text-[#2A2421]">{product.materials}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7B70]">Gemstone:</span>
                  <span className="font-medium text-[#2A2421]">{product.gemstone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7B70]">Certification:</span>
                  <span className="font-medium text-[#2A2421]">{product.specifications.certification}</span>
                </div>
              </div>

              {/* Metal Selection */}
              <div className="mt-5">
                <label className="block text-xs uppercase tracking-wider text-[#6E6056] font-medium mb-2">
                  Select Precious Metal: <span className="text-[#2A2421] font-semibold">{selectedMetal}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.availableMetals.map((metal) => (
                    <button
                      key={metal}
                      type="button"
                      onClick={() => setSelectedMetal(metal)}
                      className={`px-3 py-1.5 text-xs tracking-wide transition-all border ${
                        selectedMetal === metal
                          ? 'border-[#2A2421] bg-[#2A2421] text-white'
                          : 'border-[#DDD3C7] bg-white text-[#52443C] hover:border-[#8C6D46]'
                      }`}
                    >
                      {metal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection (if ring or bracelet) */}
              {product.availableSizes && product.availableSizes.length > 0 && (
                <div className="mt-4">
                  <label className="block text-xs uppercase tracking-wider text-[#6E6056] font-medium mb-2">
                    Select Size: <span className="text-[#2A2421] font-semibold">{selectedSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.availableSizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`w-9 h-9 text-xs flex items-center justify-center font-medium transition-all border ${
                          selectedSize === sz
                            ? 'border-[#C5A880] bg-[#C5A880] text-[#1E1917] font-semibold'
                            : 'border-[#DDD3C7] bg-white text-[#52443C] hover:border-[#C5A880]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs uppercase tracking-wider text-[#6E6056] font-medium">Quantity</span>
                <div className="flex items-center border border-[#DDD3C7] bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-sm text-[#2A2421] hover:bg-[#F2ECE2] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-semibold text-[#2A2421] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-sm text-[#2A2421] hover:bg-[#F2ECE2] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 pt-5 border-t border-[#EAE3D8] space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="py-3 px-4 border border-[#2A2421] text-[#2A2421] hover:bg-[#2A2421] hover:text-[#FAF7F2] text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2"
                >
                  {addedAnimation ? <Check className="w-4 h-4 text-emerald-600" /> : <ShoppingBag className="w-4 h-4" />}
                  <span>{addedAnimation ? 'Added to Bag!' : 'Add to Cart'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleBuy}
                  className="py-3 px-4 bg-[#C5A880] text-[#1E1917] hover:bg-[#B49467] text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* View Full Product Details Link */}
              <div className="text-center pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenFullDetails(product);
                  }}
                  className="text-xs text-[#8C6D46] hover:text-[#2A2421] underline underline-offset-4 tracking-wider uppercase font-medium"
                >
                  Open Full Product Details &amp; Specifications &rarr;
                </button>
              </div>

              {/* Reassurance Icons */}
              <div className="pt-3 grid grid-cols-3 gap-2 text-[10px] text-[#8C7B70] text-center border-t border-[#EDE6DC]">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Complimentary Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Authenticity Certificate</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
