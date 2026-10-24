import React, { useState } from 'react';
import {
  X,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Check,
  Star,
} from 'lucide-react';
import { PerfumeProduct } from '../../types/perfume';
import { PERFUME_CATALOG } from '../../data/perfumeCatalog';
import { useTheme } from '../../context/ThemeContext';

interface ProductDetailsModalProps {
  product: PerfumeProduct | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: PerfumeProduct) => void;
  onAddToCart: (product: PerfumeProduct, size: string, quantity: number) => void;
  onSelectRelated: (product: PerfumeProduct) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onSelectRelated,
}) => {
  const { isLight } = useTheme();

  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(
    product.defaultSize || product.availableSizes[0] || '50ml'
  );
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'notes' | 'story' | 'shipping'>('notes');

  const currentPrice = (product.sizePrices[selectedSize] || product.price) * quantity;
  const singleUnitPrice = product.sizePrices[selectedSize] || product.price;

  const galleryImages = [
    product.image,
    ...(product.secondaryImages || []),
  ].filter((v, i, a) => a.indexOf(v) === i);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  // Related fragrances from the same family or unisex
  const relatedProducts = PERFUME_CATALOG.filter(
    (p) => p.id !== product.id && (p.family === product.family || p.gender === product.gender)
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className={`relative w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden my-6 border transition-colors ${
        isLight
          ? 'bg-[#FFFFFF] border-[#E5D9C5] text-[#1A1616]'
          : 'bg-[#171515] border-[#C2A064]/40 text-[#F3EDE3]'
      }`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-30 p-2 rounded-full border transition-colors ${
            isLight
              ? 'bg-[#FAF7F2] hover:bg-[#F4EFE6] border-[#E5D9C5] text-[#1A1616]'
              : 'bg-[#171515]/80 hover:bg-[#421C27] border-[#C2A064]/30 text-[#A89F93] hover:text-[#F3EDE3]'
          }`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[88vh] overflow-y-auto">
          {/* Left Column: Gallery & High-Res View */}
          <div className={`lg:col-span-6 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r flex flex-col justify-between ${
            isLight 
              ? 'bg-[#F5EFE6] border-[#E5D9C5]' 
              : 'bg-[#131111] border-[#C2A064]/20'
          }`}>
            <div className="space-y-4">
              {/* Main Active Flacon Photography */}
              <div className={`relative aspect-[4/4.5] rounded-lg overflow-hidden border shadow-inner group ${
                isLight ? 'border-[#E5D9C5] bg-[#FFFFFF]' : 'border-[#C2A064]/30 bg-[#171515]'
              }`}>
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 z-20 flex gap-2">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-sans tracking-widest uppercase backdrop-blur-md border ${
                    isLight
                      ? 'bg-[#591D2D] text-[#FAF7F2] border-[#591D2D]'
                      : 'bg-[#421C27]/90 text-[#DFC48E] border-[#C2A064]/40'
                  }`}>
                    {product.concentration}
                  </span>
                </div>
              </div>

              {/* Thumbnails Strip */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-3">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-16 h-16 rounded-md overflow-hidden border transition-all ${
                        selectedImage === img
                          ? isLight
                            ? 'border-[#9A742A] ring-2 ring-[#9A742A]/40 scale-105'
                            : 'border-[#C2A064] ring-2 ring-[#C2A064]/40 scale-105'
                          : 'opacity-60 hover:opacity-100 border-[#C2A064]/20'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Atelier Assurance */}
            <div className={`pt-6 border-t grid grid-cols-2 gap-3 text-xs font-sans ${
              isLight ? 'border-[#E5D9C5] text-[#5C5456]' : 'border-[#C2A064]/15 text-[#A89F93]'
            }`}>
              <div className="flex items-center gap-2">
                <ShieldCheck className={`w-4 h-4 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
                <span>100% Authentic Extrait</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className={`w-4 h-4 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
                <span>White-Glove Insured Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Intelligence & Purchase Controls */}
          <div className="lg:col-span-6 p-6 sm:p-8 space-y-6">
            {/* Header / Category / Title */}
            <div>
              <div className="flex items-center justify-between text-xs font-sans uppercase tracking-[0.2em]">
                <span className={isLight ? 'text-[#9A742A] font-medium' : 'text-[#C2A064]'}>
                  {product.family} • {product.gender}
                </span>
                <div className="flex items-center gap-1">
                  <Star className={`w-3.5 h-3.5 ${isLight ? 'fill-[#9A742A] text-[#9A742A]' : 'fill-[#DFC48E] text-[#DFC48E]'}`} />
                  <span className={`font-semibold ${isLight ? 'text-[#1A1616]' : 'text-[#DFC48E]'}`}>{product.rating}</span>
                  <span className={isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}>({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h1 className={`font-serif text-3xl sm:text-4xl font-normal mt-2 leading-tight ${
                isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'
              }`}>
                {product.name}
              </h1>

              <p className={`text-xs font-sans tracking-wider uppercase mt-1 ${
                isLight ? 'text-[#591D2D] font-medium' : 'text-[#DFC48E]'
              }`}>
                {product.subtitle}
              </p>

              <p className={`text-sm font-sans mt-3 leading-relaxed ${
                isLight ? 'text-[#5C5456]' : 'text-[#A89F93]'
              }`}>
                {product.tagline}
              </p>
            </div>

            {/* Price & Size Selector */}
            <div className={`p-4 rounded-lg border space-y-3 ${
              isLight ? 'bg-[#FAF7F2] border-[#E5D9C5]' : 'bg-[#1E1A1B] border-[#C2A064]/25'
            }`}>
              <div className="flex items-baseline justify-between">
                <div>
                  <span className={`text-xs font-sans uppercase tracking-wider block ${
                    isLight ? 'text-[#73696B]' : 'text-[#A89F93]'
                  }`}>
                    Investment for {selectedSize}
                  </span>
                  <span className={`font-serif text-3xl ${
                    isLight ? 'text-[#9A742A] font-medium' : 'text-[#DFC48E]'
                  }`}>
                    ₹{singleUnitPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <span className="text-xs text-emerald-600 font-sans font-medium">
                  In Stock • Hand-Poured
                </span>
              </div>

              {/* Size Buttons */}
              <div className="space-y-1.5 pt-1">
                <span className={`text-xs font-sans block ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
                  Select Flacon Volume:
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.availableSizes.map((size) => {
                    const priceForSize = product.sizePrices[size] || product.price;
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3.5 py-2 rounded text-xs font-sans transition-all flex items-center gap-2 ${
                          isSelected
                            ? isLight
                              ? 'bg-[#1A1616] text-[#FAF7F2] font-semibold shadow-sm'
                              : 'bg-gradient-to-r from-[#C2A064] to-[#DFC48E] text-[#171515] font-semibold shadow-md'
                            : isLight
                              ? 'bg-[#FFFFFF] text-[#5C5456] hover:text-[#1A1616] border border-[#E5D9C5]'
                              : 'bg-[#171515] text-[#A89F93] hover:text-[#F3EDE3] border border-[#C2A064]/25'
                        }`}
                      >
                        <span>{size}</span>
                        <span className="text-[10px] opacity-80">
                          (₹{priceForSize.toLocaleString('en-IN')})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quantity & Add to Bag / Wishlist */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className={`flex items-center border rounded px-2 py-1.5 ${
                  isLight ? 'bg-[#FFFFFF] border-[#E5D9C5]' : 'bg-[#171515] border-[#C2A064]/30'
                }`}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className={`w-7 h-7 flex items-center justify-center font-bold text-sm ${
                      isLight ? 'text-[#73696B] hover:text-[#1A1616]' : 'text-[#A89F93] hover:text-[#F3EDE3]'
                    }`}
                  >
                    -
                  </button>
                  <span className={`w-8 text-center text-sm font-sans font-medium ${
                    isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'
                  }`}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className={`w-7 h-7 flex items-center justify-center font-bold text-sm ${
                      isLight ? 'text-[#73696B] hover:text-[#1A1616]' : 'text-[#A89F93] hover:text-[#F3EDE3]'
                    }`}
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAdd}
                  disabled={isAdded}
                  className={`flex-1 py-3.5 px-6 rounded font-sans font-semibold text-xs tracking-[0.2em] uppercase shadow-lg transition-all flex items-center justify-center gap-2 ${
                    isLight
                      ? 'bg-gradient-to-r from-[#1A1616] via-[#351B22] to-[#1A1616] text-[#FAF7F2] hover:shadow-xl'
                      : 'bg-gradient-to-r from-[#C2A064] via-[#DFC48E] to-[#C2A064] text-[#171515] hover:brightness-110'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3] text-emerald-400" />
                      <span>Added to Shopping Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>
                        Add to Bag • ₹{currentPrice.toLocaleString('en-IN')}
                      </span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3.5 rounded border transition-all ${
                    isWishlisted
                      ? isLight
                        ? 'border-[#9A742A] bg-[#591D2D] text-[#FAF7F2]'
                        : 'border-[#C2A064] bg-[#421C27] text-[#C2A064]'
                      : isLight
                        ? 'border-[#E5D9C5] bg-[#FFFFFF] text-[#1A1616] hover:border-[#9A742A]'
                        : 'border-[#C2A064]/30 bg-[#171515] text-[#F3EDE3] hover:border-[#C2A064]'
                  }`}
                  aria-label="Toggle Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? (isLight ? 'fill-white' : 'fill-[#C2A064]') : ''}`} />
                </button>
              </div>
            </div>

            {/* Tabbed Intelligence: Notes / Story / Shipping */}
            <div className="pt-2">
              <div className={`flex border-b gap-4 text-xs font-sans uppercase tracking-wider ${
                isLight ? 'border-[#E5D9C5]' : 'border-[#C2A064]/20'
              }`}>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`pb-2.5 transition-colors relative ${
                    activeTab === 'notes'
                      ? isLight ? 'text-[#591D2D] font-bold' : 'text-[#DFC48E] font-medium'
                      : isLight ? 'text-[#73696B] hover:text-[#1A1616]' : 'text-[#A89F93] hover:text-[#F3EDE3]'
                  }`}
                >
                  Olfactory Pyramid
                  {activeTab === 'notes' && (
                    <span className={`absolute bottom-0 left-0 right-0 h-[2px] ${isLight ? 'bg-[#591D2D]' : 'bg-[#C2A064]'}`} />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('story')}
                  className={`pb-2.5 transition-colors relative ${
                    activeTab === 'story'
                      ? isLight ? 'text-[#591D2D] font-bold' : 'text-[#DFC48E] font-medium'
                      : isLight ? 'text-[#73696B] hover:text-[#1A1616]' : 'text-[#A89F93] hover:text-[#F3EDE3]'
                  }`}
                >
                  The Story
                  {activeTab === 'story' && (
                    <span className={`absolute bottom-0 left-0 right-0 h-[2px] ${isLight ? 'bg-[#591D2D]' : 'bg-[#C2A064]'}`} />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-2.5 transition-colors relative ${
                    activeTab === 'shipping'
                      ? isLight ? 'text-[#591D2D] font-bold' : 'text-[#DFC48E] font-medium'
                      : isLight ? 'text-[#73696B] hover:text-[#1A1616]' : 'text-[#A89F93] hover:text-[#F3EDE3]'
                  }`}
                >
                  Delivery & Returns
                  {activeTab === 'shipping' && (
                    <span className={`absolute bottom-0 left-0 right-0 h-[2px] ${isLight ? 'bg-[#591D2D]' : 'bg-[#C2A064]'}`} />
                  )}
                </button>
              </div>

              <div className="py-4 text-xs font-sans leading-relaxed">
                {activeTab === 'notes' && (
                  <div className={`space-y-3 p-4 rounded-lg border ${
                    isLight 
                      ? 'bg-[#FAF7F2] border-[#E5D9C5]' 
                      : 'bg-[#1E1A1B] border-[#C2A064]/15'
                  }`}>
                    <div>
                      <span className={`uppercase tracking-wider font-semibold block text-[11px] mb-1 ${
                        isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'
                      }`}>
                        Top Notes (The Spark — First 15 Mins):
                      </span>
                      <p className={isLight ? 'text-[#5C5456]' : 'text-[#A89F93]'}>
                        {product.notes.top.join(' • ')}
                      </p>
                    </div>
                    <div>
                      <span className={`uppercase tracking-wider font-semibold block text-[11px] mb-1 ${
                        isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'
                      }`}>
                        Heart Notes (The Soul — 2 to 6 Hours):
                      </span>
                      <p className={isLight ? 'text-[#5C5456]' : 'text-[#A89F93]'}>
                        {product.notes.heart.join(' • ')}
                      </p>
                    </div>
                    <div>
                      <span className={`uppercase tracking-wider font-semibold block text-[11px] mb-1 ${
                        isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'
                      }`}>
                        Base Notes (The Memory — 8 to 16+ Hours):
                      </span>
                      <p className={isLight ? 'text-[#5C5456]' : 'text-[#A89F93]'}>
                        {product.notes.base.join(' • ')}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'story' && (
                  <div className={`space-y-3 ${isLight ? 'text-[#5C5456]' : 'text-[#A89F93]'}`}>
                    <p>{product.description}</p>
                    <p className={`italic ${isLight ? 'text-[#9A742A]' : 'text-[#DFC48E]'}`}>
                      "{product.inspiration}"
                    </p>
                    <div className="pt-2">
                      <span className={`font-medium block ${isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'}`}>
                        Recommended Occasions:
                      </span>
                      <span>{product.recommendedOccasions.join(', ')}</span>
                    </div>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className={`space-y-2.5 ${isLight ? 'text-[#5C5456]' : 'text-[#A89F93]'}`}>
                    <p>• Dispatched within 24 hours in tamper-evident sealed luxury casing.</p>
                    <p>• Complimentary white-glove insured delivery across all major Indian cities in 2-3 business days.</p>
                    <p>• Includes two complimentary 2ml sample vials so you may test the scent before breaking the wax seal on the main flacon.</p>
                    <p>• Unopened boxes with intact seals are eligible for 14-day boutique exchange.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Related Fragrances Carousel */}
            {relatedProducts.length > 0 && (
              <div className={`pt-2 border-t space-y-2 ${isLight ? 'border-[#E5D9C5]' : 'border-[#C2A064]/20'}`}>
                <h4 className={`text-xs uppercase tracking-widest font-sans font-semibold ${
                  isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'
                }`}>
                  You May Also Admire:
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {relatedProducts.map((rel) => (
                    <button
                      key={rel.id}
                      onClick={() => onSelectRelated(rel)}
                      className={`p-2 rounded border text-left transition-all group ${
                        isLight
                          ? 'bg-[#FAF7F2] border-[#E5D9C5] hover:border-[#9A742A]'
                          : 'bg-[#1E1A1B] border-[#C2A064]/20 hover:border-[#C2A064]'
                      }`}
                    >
                      <img
                        src={rel.image}
                        alt={rel.name}
                        className="w-full aspect-square rounded object-cover mb-1.5"
                        referrerPolicy="no-referrer"
                      />
                      <p className={`font-serif text-xs truncate transition-colors ${
                        isLight ? 'text-[#1A1616] group-hover:text-[#9A742A]' : 'text-[#F3EDE3] group-hover:text-[#DFC48E]'
                      }`}>
                        {rel.name}
                      </p>
                      <p className={`text-[10px] font-sans font-medium ${isLight ? 'text-[#9A742A]' : 'text-[#DFC48E]'}`}>
                        ₹{rel.price.toLocaleString('en-IN')}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
