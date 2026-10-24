import React, { useState, useEffect } from 'react';
import {
  X,
  Heart,
  ShoppingBag,
  Star,
  Check,
  ShieldCheck,
  Sun,
  Droplets,
  Clock,
  ArrowRight,
  MapPin,
  Video,
  Image as ImageIcon,
} from 'lucide-react';
import { SunscreenProduct } from '../../types/sunscreen';
import { CustomerReviewsSection } from './CustomerReviewsSection';
import watermelonMovingVideo from '../../assets/videos/dotkey_watermelon_cooling_moving.mp4';
import watermelonPosterImg from '../../assets/images/dotkey_watermelon_pin_poster.jpg';

interface ProductDetailModalProps {
  product: SunscreenProduct | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  allProducts: SunscreenProduct[];
  onToggleWishlist: (product: SunscreenProduct) => void;
  onAddToCart: (product: SunscreenProduct, size: string, qty: number) => void;
  onBuyNow: (product: SunscreenProduct, size: string, qty: number) => void;
  onSelectRelated: (product: SunscreenProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  allProducts,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onSelectRelated,
}) => {
  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.defaultSize);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'howToApply' | 'faqs'>('benefits');

  // Live reviews rating and review count state
  const [currentRating, setCurrentRating] = useState<number>(product.rating);
  const [currentReviewsCount, setCurrentReviewsCount] = useState<number>(product.reviewsCount);
  const [isVideoMode, setIsVideoMode] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.defaultSize);
      setCurrentRating(product.rating);
      setCurrentReviewsCount(product.reviewsCount);
      setActiveImageIndex(0);
      setIsVideoMode(false);
    }
  }, [product]);

  const handleReviewAdded = (newCount: number, newRating: number) => {
    setCurrentReviewsCount(newCount);
    setCurrentRating(newRating);
  };

  // Pincode delivery checker
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState<string | null>(null);

  const activeSizeObj =
    product.sizes.find((s) => s.size === selectedSize) || product.sizes[0];

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setDeliveryResult(`✅ Free Express Delivery to ${pincode} in 2-3 business days!`);
    } else {
      setDeliveryResult('⚠️ Please enter a valid 6-digit Indian PIN code (e.g. 110001).');
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleBuyNow = () => {
    onBuyNow(product, selectedSize, quantity);
  };

  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 3);
  const imagesToDisplay = product.galleryImages.length > 0 ? product.galleryImages : [product.image];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/50 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl sm:rounded-[2rem] shadow-2xl overflow-hidden border border-[#F5D5DE] my-auto max-h-[92vh] flex flex-col">
        {/* Top Close Bar */}
        <div className="p-3 sm:p-4 bg-gradient-to-r from-[#F9DDE5] via-[#FCEEF2] to-[#F9DDE5] border-b border-[#F5D5DE] flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/95 text-[#633D4B] shadow-xs flex items-center gap-1 border border-[#F5D5DE]">
              <Sun className="w-3 h-3 text-[#FF8C9A] fill-[#FF8C9A]" />
              {product.spfRating} {product.paRating}
            </span>
            <span className="text-xs font-bold text-[#8E6B78] hidden sm:inline">
              {product.suitableForSkin}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#F9DDE5] text-[#8E6B78] hover:text-[#633D4B] flex items-center justify-center shadow-xs transition-colors cursor-pointer border border-[#F5D5DE]"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left: Gallery Showcase */}
            <div className="md:col-span-6 flex flex-col gap-3">
              {/* Media Switcher: Photo Gallery vs Live Moving Video */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsVideoMode(false)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    !isVideoMode
                      ? 'bg-[#633D4B] text-white shadow-xs'
                      : 'bg-[#FCEEF2] text-[#633D4B] hover:bg-[#F9DDE5] border border-[#F5D5DE]'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Photos ({imagesToDisplay.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsVideoMode(true)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isVideoMode
                      ? 'bg-[#FF8C9A] text-white shadow-xs'
                      : 'bg-[#FCEEF2] text-[#633D4B] hover:bg-[#F9DDE5] border border-[#F5D5DE]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  <Video className="w-3.5 h-3.5 text-current" />
                  <span>Live Moving Video</span>
                </button>
              </div>

              {/* Primary Large Image / Video View */}
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-[#FCEEF2] border border-[#F5D5DE] shadow-sm">
                {isVideoMode ? (
                  <div className="relative w-full h-full bg-black flex items-center justify-center">
                    <video
                      src={watermelonMovingVideo}
                      poster={watermelonPosterImg}
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1.5 pointer-events-none">
                      <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                      <span>Live Motion Animation</span>
                    </div>
                  </div>
                ) : (
                  <img
                    src={imagesToDisplay[activeImageIndex] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                )}

                {/* Floating Wishlist Heart */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 hover:bg-white backdrop-blur-xs flex items-center justify-center text-[#8E6B78] hover:text-[#FF8C9A] transition-all shadow-md z-10 cursor-pointer border border-[#F5D5DE]"
                  title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart
                    className={`w-5 h-5 transition-transform ${
                      isWishlisted
                        ? 'fill-[#FF8C9A] text-[#FF8C9A] scale-110'
                        : 'text-[#8E6B78]'
                    }`}
                  />
                </button>

                {/* Bottom Left Quality Pill */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-black text-[#633D4B] shadow-xs flex items-center gap-1 border border-[#F5D5DE]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF8C9A]" />
                  <span>{product.whiteCast}</span>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {imagesToDisplay.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {imagesToDisplay.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                        activeImageIndex === idx ? 'border-[#FF8C9A] scale-105 shadow-xs' : 'border-[#F5D5DE] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Purchase Form */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-4">
              <div>
                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex items-center text-[#FF8C9A]">
                    <Star className="w-4 h-4 fill-[#FF8C9A]" />
                  </div>
                  <span className="font-extrabold text-sm text-[#633D4B]">{currentRating}</span>
                  <span className="text-xs text-[#8E6B78]">
                    • ({currentReviewsCount.toLocaleString()} verified buyer reviews)
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#633D4B] leading-tight font-display">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-[#FF8C9A] mt-1">
                  {product.subtitle}
                </p>

                {/* Pricing Block */}
                <div className="flex items-baseline gap-2.5 mt-3">
                  <span className="text-2xl sm:text-3xl font-black text-[#633D4B]">
                    ₹{activeSizeObj.price}
                  </span>
                  {activeSizeObj.originalPrice > activeSizeObj.price && (
                    <span className="text-sm sm:text-base text-[#8E6B78] line-through font-semibold">
                      ₹{activeSizeObj.originalPrice}
                    </span>
                  )}
                  {product.discountPercent > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#F9DDE5] text-[#633D4B] border border-[#F5D5DE]">
                      Save {product.discountPercent}%
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#15803D] font-bold mt-0.5">
                  Inclusive of all taxes • Free shipping over ₹499
                </p>

                {/* Size Selector */}
                <div className="mt-4">
                  <label className="block text-xs font-black text-[#633D4B] uppercase tracking-wider mb-2">
                    Select Packaging Size:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s.size}
                        onClick={() => setSelectedSize(s.size)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                          selectedSize === s.size
                            ? 'bg-[#633D4B] text-white shadow-sm'
                            : 'bg-[#FCEEF2] text-[#633D4B] hover:bg-[#F9DDE5] border border-[#F5D5DE]'
                        }`}
                      >
                        {s.size} (₹{s.price})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity and Actions */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#8E6B78]">Quantity:</span>
                    <div className="flex items-center border border-[#F5D5DE] rounded-xl bg-[#FCEEF2] overflow-hidden">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-3 py-1 text-sm font-bold text-[#633D4B] hover:bg-[#F9DDE5] cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-black text-[#633D4B]">{quantity}</span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="px-3 py-1 text-sm font-bold text-[#633D4B] hover:bg-[#F9DDE5] cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={handleAddToCart}
                      className={`w-full py-3.5 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                        isAdded
                          ? 'bg-[#633D4B] text-white'
                          : 'bg-[#FF8C9A] hover:bg-[#FF7586] text-white shadow-[#FF8C9A]/30 active:scale-98'
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
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleBuyNow}
                      className="w-full py-3.5 rounded-2xl bg-[#633D4B] hover:bg-[#7D4E5E] text-white text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-98"
                    >
                      <span>Buy Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Pincode Delivery Checker */}
                <div className="mt-5 p-3.5 rounded-2xl bg-[#FCEEF2] border border-[#F5D5DE]">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#633D4B] mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FF8C9A]" />
                    <span>Check Delivery Availability</span>
                  </div>
                  <form onSubmit={handleCheckPincode} className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="Enter 6-digit Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="flex-1 bg-white border border-[#F5D5DE] rounded-xl px-3 py-1.5 text-xs text-[#633D4B] placeholder:text-[#8E6B78] focus:outline-none focus:ring-1 focus:ring-[#FF8C9A]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl bg-[#633D4B] text-white text-xs font-bold hover:bg-[#FF8C9A] transition-colors cursor-pointer"
                    >
                      Check
                    </button>
                  </form>
                  {deliveryResult && (
                    <p className="text-[11px] font-semibold text-[#633D4B] mt-2">
                      {deliveryResult}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Deep Tabs: Benefits, Ingredients, Application Guide, FAQs */}
          <div className="pt-6 border-t border-[#F5D5DE]">
            <div className="flex gap-2 border-b border-[#F5D5DE] pb-2 overflow-x-auto scrollbar-none">
              {[
                { id: 'benefits', label: 'Verified Benefits' },
                { id: 'ingredients', label: 'Key Actives & Ingredients' },
                { id: 'howToApply', label: 'How To Apply (2-Finger Rule)' },
                { id: 'faqs', label: 'Sunscreen FAQs' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#FF8C9A] text-white shadow-xs'
                      : 'text-[#8E6B78] hover:text-[#633D4B] hover:bg-[#FCEEF2]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="pt-4 text-xs sm:text-sm text-[#633D4B] leading-relaxed">
              {activeTab === 'benefits' && (
                <div className="space-y-3">
                  <p className="font-semibold text-[#633D4B]">{product.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    <div className="p-3 rounded-2xl bg-[#FCEEF2] border border-[#F5D5DE] flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#FF8C9A] shrink-0" />
                      <span className="font-bold text-xs text-[#633D4B]">{product.whiteCast}</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-[#FCEEF2] border border-[#F5D5DE] flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-[#FF8C9A] shrink-0" />
                      <span className="font-bold text-xs text-[#633D4B]">{product.waterResistant}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {product.keyIngredients.map((ing) => (
                      <div
                        key={ing.name}
                        className="p-3.5 rounded-2xl bg-white border border-[#F5D5DE]"
                      >
                        <p className="font-black text-xs text-[#633D4B]">{ing.name}</p>
                        <p className="text-[11px] text-[#8E6B78] mt-1">{ing.benefit}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#633D4B] mb-1">Full Ingredients:</h4>
                    <p className="text-[11px] text-[#8E6B78] leading-relaxed">{product.fullIngredients}</p>
                  </div>
                </div>
              )}

              {activeTab === 'howToApply' && (
                <div className="p-4 rounded-2xl bg-[#FCEEF2] border border-[#F5D5DE] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-[#633D4B] uppercase tracking-wider">
                    <Clock className="w-4 h-4 text-[#FF8C9A]" />
                    <span>Dermatologist Application Protocol</span>
                  </div>
                  <p>{product.howToApply}</p>
                  <p className="text-xs text-[#8E6B78]">
                    Tip: Reapply every 2 to 3 hours if outdoors under direct sun exposure or after swimming/sweating.
                  </p>
                </div>
              )}

              {activeTab === 'faqs' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-white border border-[#F5D5DE]">
                    <p className="font-bold text-xs text-[#633D4B]">Q: Can I wear this under makeup?</p>
                    <p className="text-xs text-[#8E6B78] mt-0.5">Yes, its water-burst formula acts as a smoothing primer that prevents foundation pilling.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#F5D5DE]">
                    <p className="font-bold text-xs text-[#633D4B]">Q: Does it cause eye stinging?</p>
                    <p className="text-xs text-[#8E6B78] mt-0.5">No, modern hybrid filters are alcohol-free and ophthalmologically evaluated to prevent eye burns.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Customer Reviews & Ratings Section (Below Product Description, Above Related Products) */}
          <div className="pt-6 border-t border-[#F5D5DE]">
            <CustomerReviewsSection
              productName={product.name}
              productId={product.id}
              onReviewAdded={handleReviewAdded}
            />
          </div>

          {/* Related Sunscreens */}
          <div className="pt-6 border-t border-[#F5D5DE]">
            <h3 className="font-black text-base text-[#633D4B] mb-3 font-display">
              Frequently Paired With
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectRelated(rel)}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#F5D5DE] hover:border-[#FF8C9A] transition-all cursor-pointer shadow-xs"
                >
                  <img src={rel.image} alt={rel.name} className="w-12 h-12 rounded-xl object-cover shrink-0 bg-[#FCEEF2]" />
                  <div className="truncate">
                    <p className="font-bold text-xs text-[#633D4B] truncate">{rel.name}</p>
                    <p className="text-[11px] font-black text-[#FF8C9A]">₹{rel.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
