import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Flame, Sparkles, Sun } from 'lucide-react';
import { SunscreenProduct } from '../../types/sunscreen';
import { ProductCard } from './ProductCard';

interface ProductCarouselProps {
  products: SunscreenProduct[];
  wishlistIds: string[];
  onToggleWishlist: (product: SunscreenProduct) => void;
  onAddToCart: (product: SunscreenProduct, size: string) => void;
  onQuickView: (product: SunscreenProduct) => void;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activePageIndex, setActivePageIndex] = useState(0);

  const bestsellers = products.filter((p) => p.isBestseller);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 20);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);

    // Approximate active page
    const page = Math.round(el.scrollLeft / (el.clientWidth * 0.8));
    setActivePageIndex(page);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const amount = direction === 'left' ? -el.clientWidth * 0.75 : el.clientWidth * 0.75;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollTo({ left: index * (el.clientWidth * 0.75), behavior: 'smooth' });
  };

  return (
    <section id="bestsellers-carousel" className="py-12 sm:py-16 bg-[#FCEEF2] border-b border-[#F5D5DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white text-[#633D4B] border border-[#F5D5DE] text-xs font-black uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5 text-[#FF8C9A] fill-[#FF8C9A]" />
              <span>Trending &amp; Viral Sunscreens</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#633D4B] tracking-tight font-display">
              Bestselling Sun Protection
            </h2>
            <p className="text-xs sm:text-sm text-[#8E6B78] mt-1 leading-relaxed">
              Loved by skincare experts and everyday glow lovers across India.
            </p>
          </div>

          {/* Left / Right Carousel Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                canScrollLeft
                  ? 'bg-white hover:bg-[#FF8C9A] text-[#633D4B] hover:text-white border border-[#F5D5DE]'
                  : 'bg-white/50 text-[#C4B5BD] cursor-not-allowed border border-transparent'
              }`}
              aria-label="Previous sunscreen"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                canScrollRight
                  ? 'bg-white hover:bg-[#FF8C9A] text-[#633D4B] hover:text-white border border-[#F5D5DE]'
                  : 'bg-white/50 text-[#C4B5BD] cursor-not-allowed border border-transparent'
              }`}
              aria-label="Next sunscreen"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontally scrolling carousel: 4 cards on desktop, 2 cards on mobile */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 scroll-smooth scrollbar-none snap-x snap-mandatory"
        >
          {bestsellers.map((product) => (
            <div
              key={product.id}
              className="w-[calc(50%-8px)] sm:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] shrink-0 snap-start"
            >
              <ProductCard
                product={product}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            </div>
          ))}
        </div>

        {/* Carousel indicator dots */}
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {Array.from({ length: Math.ceil(bestsellers.length / 2) }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                activePageIndex === idx ? 'w-6 bg-[#FF8C9A]' : 'w-2 bg-[#F5CAD4] hover:bg-[#FF8C9A]'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
