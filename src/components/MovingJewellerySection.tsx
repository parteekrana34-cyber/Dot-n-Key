import React from 'react';
import { Star, Sparkles, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types/jewellery';

interface MovingJewellerySectionProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const MovingJewellerySection: React.FC<MovingJewellerySectionProps> = ({
  products,
  onQuickView,
  onAddToCart,
}) => {
  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...products, ...products];

  return (
    <section className="py-20 bg-[#F4EFE6] border-b border-[#E6DFD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-[#8C6D46] font-medium mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Motion Showcase</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#2A2421] font-light tracking-tight">
          In Continuous Brilliance
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#73655B] font-light">
          Hover over any piece to pause the showcase and inspect craftsmanship details.
        </p>
      </div>

      {/* Infinite Horizontal Carousel */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Soft edge blur overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#F4EFE6] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#F4EFE6] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-6 sm:gap-8 px-4 cursor-pointer">
          {marqueeItems.map((product, idx) => (
            <div
              key={`${product.id}-${idx}`}
              className="w-72 sm:w-80 shrink-0 bg-[#FAF7F2] border border-[#E2DAD0] shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Product Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#ECE4D8]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Category Tag */}
                <span className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-xs text-[10px] uppercase tracking-wider text-[#645850] px-2.5 py-1 font-medium border border-[#E6DFD5]">
                  {product.category}
                </span>

                {/* Hover Quick Action Buttons */}
                <div className="absolute inset-0 bg-[#2A2421]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickView(product);
                    }}
                    className="p-2.5 bg-white text-[#2A2421] hover:bg-[#C5A880] hover:text-white transition-colors rounded-full shadow-md"
                    title="Quick View"
                    aria-label={`Quick view ${product.name}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="p-2.5 bg-[#2A2421] text-white hover:bg-[#8C6D46] transition-colors rounded-full shadow-md"
                    title="Add to Cart"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="flex items-center text-[#C5A880]">
                      <Star className="w-3.5 h-3.5 fill-[#C5A880]" />
                    </div>
                    <span className="text-xs font-semibold text-[#2A2421] tabular-nums">
                      {product.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-[#8C7B70] tabular-nums">
                      ({product.reviewsCount})
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-[#2A2421] font-medium tracking-tight truncate group-hover:text-[#8C6D46] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#7A6C63] font-light truncate mt-0.5">
                    {product.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EAE3D8] flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-semibold text-[#2A2421] font-sans tabular-nums">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-[#9B8F86] line-through tabular-nums">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => onQuickView(product)}
                    className="text-xs uppercase tracking-wider text-[#8C6D46] font-semibold hover:text-[#2A2421] transition-colors"
                  >
                    Details &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
