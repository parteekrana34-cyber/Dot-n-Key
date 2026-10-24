import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Heart, ShoppingBag, Zap, ShieldCheck, Truck, RotateCcw, Gem, Award, Check } from 'lucide-react';
import { Product } from '../types/jewellery';
import { ProductCard } from './ProductCard';

interface ProductDetailsPageProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  onAddToCart: (p: Product, quantity: number, metal: string, size?: string) => void;
  onBuyNow: (p: Product, quantity: number, metal: string, size?: string) => void;
  onSelectProduct: (p: Product) => void;
  wishlistIds: string[];
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  product,
  allProducts,
  onBack,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
  wishlistIds,
}) => {
  const [selectedMetal, setSelectedMetal] = useState<string>(product.availableMetals[0] || '18K Yellow Gold');
  const [selectedSize, setSelectedSize] = useState<string>(product.availableSizes ? product.availableSizes[0] : '');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [activeTab, setActiveTab] = useState<'details' | 'gemology' | 'shipping' | 'reviews'>('details');
  const [addedMessage, setAddedMessage] = useState(false);

  useEffect(() => {
    setActiveImage(product.image);
    setSelectedMetal(product.availableMetals[0] || '18K Yellow Gold');
    setSelectedSize(product.availableSizes && product.availableSizes.length > 0 ? product.availableSizes[0] : '');
    setQuantity(1);
  }, [product.id, product.image]);

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.isBestseller))
    .slice(0, 3);

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedMetal, selectedSize);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  const handleBuyNow = () => {
    onBuyNow(product, quantity, selectedMetal, selectedSize);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8 sm:py-12 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumbs & Back button */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#6E6056] hover:text-[#2A2421] transition-colors font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Collection</span>
          </button>
          <div className="text-xs text-[#8C7B70] hidden sm:block">
            <span>Home</span> / <span>{product.category}</span> / <span className="text-[#2A2421] font-semibold">{product.name}</span>
          </div>
        </div>

        {/* Main Contiguous Purchase Module & Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Gallery Module (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-[#ECE4D8] border border-[#DDD3C7] shadow-sm">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
                referrerPolicy="no-referrer"
              />

              {/* Wishlist Heart */}
              <button
                onClick={() => onToggleWishlist(product)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-colors ${
                  isWishlisted
                    ? 'bg-[#8C6D46] text-white shadow-md'
                    : 'bg-white/80 text-[#2A2421] hover:bg-white hover:text-[#8C6D46]'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>

              {/* Tag */}
              <div className="absolute top-4 left-4">
                <span className="bg-[#2A2421] text-[#FAF7F2] text-xs uppercase tracking-widest px-3 py-1 font-semibold">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={() => setActiveImage(product.image)}
                aria-label={`View main ${product.name} angle`}
                className={`w-20 h-20 sm:w-24 sm:h-24 border-2 overflow-hidden bg-white transition-all cursor-pointer ${
                  activeImage === product.image
                    ? 'border-[#C5A880] ring-2 ring-[#C5A880]/30 shadow-sm'
                    : 'border-[#DDD3C7] opacity-75 hover:opacity-100 hover:border-[#C5A880]'
                }`}
              >
                <img src={product.image} alt="View 1" className="w-full h-full object-cover" />
              </button>
              {product.secondaryImage && (
                <button
                  type="button"
                  onClick={() => setActiveImage(product.secondaryImage!)}
                  aria-label={`View secondary ${product.name} angle`}
                  className={`w-20 h-20 sm:w-24 sm:h-24 border-2 overflow-hidden bg-white transition-all cursor-pointer ${
                    activeImage === product.secondaryImage
                      ? 'border-[#C5A880] ring-2 ring-[#C5A880]/30 shadow-sm'
                      : 'border-[#DDD3C7] opacity-75 hover:opacity-100 hover:border-[#C5A880]'
                  }`}
                >
                  <img src={product.secondaryImage} alt="View 2" className="w-full h-full object-cover" />
                </button>
              )}
            </div>
          </div>

          {/* Sticky Purchase Module (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#8C7B70] uppercase tracking-wider">
                <span>Ref. {product.id.toUpperCase()}</span>
                <div className="flex items-center gap-1.5 text-[#2A2421]">
                  <div className="flex text-[#C5A880]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-[#C5A880] text-[#C5A880]'
                            : 'text-[#DDD3C7]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold tabular-nums">{product.rating.toFixed(1)}</span>
                  <span>({product.reviewsCount} verified reviews)</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#2A2421] font-medium tracking-tight">
                  {product.name}
                </h1>
                <p className="mt-1 text-sm text-[#73645A] font-light">{product.subtitle}</p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pb-6 border-b border-[#EAE3D8]">
                <span className="text-3xl font-semibold text-[#2A2421] font-sans tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-[#9E9086] line-through tabular-nums">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 font-semibold uppercase tracking-wider">
                  In Stock & Ready to Ship
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-[#665950] font-light leading-relaxed">
                {product.description}
              </p>

              {/* Metal Options */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6E6056] font-medium mb-2.5">
                  Precious Metal: <span className="text-[#2A2421] font-semibold">{selectedMetal}</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {product.availableMetals.map((metal) => (
                    <button
                      key={metal}
                      type="button"
                      onClick={() => setSelectedMetal(metal)}
                      className={`py-2 px-3 text-xs tracking-wider transition-all border text-left ${
                        selectedMetal === metal
                          ? 'border-[#2A2421] bg-[#2A2421] text-white font-medium'
                          : 'border-[#DDD3C7] bg-white text-[#52443C] hover:border-[#8C6D46]'
                      }`}
                    >
                      {metal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Options */}
              {product.availableSizes && (
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <label className="text-xs uppercase tracking-wider text-[#6E6056] font-medium">
                      Select Size: <span className="text-[#2A2421] font-semibold">{selectedSize}</span>
                    </label>
                    <span className="text-[11px] text-[#8C6D46] underline cursor-pointer">
                      Ring Sizing Guide
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.availableSizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`h-10 min-w-10 px-3 text-xs flex items-center justify-center font-medium transition-all border ${
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
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-wider text-[#6E6056] font-medium">Quantity</span>
                <div className="flex items-center border border-[#DDD3C7] bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-sm text-[#2A2421] hover:bg-[#F2ECE2] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-xs font-semibold text-[#2A2421] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-sm text-[#2A2421] hover:bg-[#F2ECE2] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="py-3.5 px-4 border border-[#2A2421] text-[#2A2421] hover:bg-[#2A2421] hover:text-[#FAF7F2] text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    {addedMessage ? <Check className="w-4 h-4 text-emerald-600" /> : <ShoppingBag className="w-4 h-4" />}
                    <span>{addedMessage ? 'Added to Bag!' : 'Add to Cart'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="py-3.5 px-4 bg-[#C5A880] text-[#1E1917] hover:bg-[#B49467] text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>

              {/* Trust Callouts */}
              <div className="pt-6 border-t border-[#EAE3D8] space-y-3 text-xs text-[#6B5E55]">
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 text-[#8C6D46] shrink-0" />
                  <span>Complimentary insured courier delivery with discreet security seal.</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#8C6D46] shrink-0" />
                  <span>Includes embossed Payora Certificate of Authenticity &amp; Gemological Dossier.</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-4 h-4 text-[#8C6D46] shrink-0" />
                  <span>30-Day complimentary returns or ring size adjustments.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed In-Depth Information Section */}
        <div className="mt-20 pt-10 border-t border-[#EAE3D8]">
          <div className="flex border-b border-[#E0D5C7] space-x-8">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-4 text-xs uppercase tracking-[0.2em] font-medium transition-all ${
                activeTab === 'details'
                  ? 'border-b-2 border-[#2A2421] text-[#2A2421] font-semibold'
                  : 'text-[#8C7B70] hover:text-[#2A2421]'
              }`}
            >
              Materials &amp; Craftsmanship
            </button>
            <button
              onClick={() => setActiveTab('gemology')}
              className={`pb-4 text-xs uppercase tracking-[0.2em] font-medium transition-all ${
                activeTab === 'gemology'
                  ? 'border-b-2 border-[#2A2421] text-[#2A2421] font-semibold'
                  : 'text-[#8C7B70] hover:text-[#2A2421]'
              }`}
            >
              Gemological Dossier
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-4 text-xs uppercase tracking-[0.2em] font-medium transition-all ${
                activeTab === 'shipping'
                  ? 'border-b-2 border-[#2A2421] text-[#2A2421] font-semibold'
                  : 'text-[#8C7B70] hover:text-[#2A2421]'
              }`}
            >
              Packaging &amp; White-Glove Delivery
            </button>
          </div>

          <div className="py-8 text-sm text-[#665950] font-light leading-relaxed max-w-4xl">
            {activeTab === 'details' && (
              <div className="space-y-4">
                <p>
                  Every Payora creation originates from ethical European foundry ingots refined to 750‰ pure gold standards (18 Karat). Each stone is hand-selected and seated under 40x microscopic inspection to verify optical symmetry, fiery dispersion, and table alignment.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-[#F5EFEB] border border-[#E7DFD4]">
                    <span className="text-xs uppercase tracking-wider text-[#8C7B70] block">Gold Hallmark</span>
                    <span className="font-semibold text-[#2A2421]">{product.karat} Solid Gold (750 / 950 Pt)</span>
                  </div>
                  <div className="p-4 bg-[#F5EFEB] border border-[#E7DFD4]">
                    <span className="text-xs uppercase tracking-wider text-[#8C7B70] block">Origin Atelier</span>
                    <span className="font-semibold text-[#2A2421]">{product.specifications.origin}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'gemology' && (
              <div className="space-y-4">
                <p>
                  Payora Jewels strictly observes the Kimberley Process and RJC (Responsible Jewellery Council) protocols. All diamonds and colored stones feature individual serial micro-laser inscriptions on the girdle corresponding with the enclosed passport.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-[#F5EFEB] border border-[#E7DFD4]">
                    <span className="text-xs uppercase tracking-wider text-[#8C7B70] block">Gemstone &amp; Cut</span>
                    <span className="font-semibold text-[#2A2421]">{product.gemstone}</span>
                  </div>
                  <div className="p-4 bg-[#F5EFEB] border border-[#E7DFD4]">
                    <span className="text-xs uppercase tracking-wider text-[#8C7B70] block">Clarity &amp; Certification</span>
                    <span className="font-semibold text-[#2A2421]">{product.specifications.diamondClarity} · {product.specifications.certification}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4">
                <p>
                  Your jewelry arrives encased within our signature champagne linen jewel box with velvet interior, velvet travel pouch, microfiber polishing cloth, and tamper-evident courier seal.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li>Complimentary priority courier delivery with adult signature requirement</li>
                  <li>Fully insured in transit from atelier to doorstep</li>
                  <li>Complimentary returns within 30 days of delivery confirmation</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Creations */}
        <div className="mt-20 pt-12 border-t border-[#EAE3D8]">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#2A2421] font-light mb-8">
            Complete the Suite
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                isWishlisted={wishlistIds.includes(rel.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={() => {}}
                onAddToCart={(p) => onAddToCart(p, 1, p.availableMetals[0])}
                onBuyNow={(p) => onBuyNow(p, 1, p.availableMetals[0])}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
