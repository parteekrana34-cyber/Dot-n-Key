import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { REVIEWS } from '../data/products';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#FAF7F2] border-b border-[#EAE3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.28em] text-[#8C6D46] font-medium mb-2">
            Collector Testimonials
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#2A2421] tracking-tight">
            What Our Customers Say
          </h2>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-[#6E6056]">
            <div className="flex text-[#C5A880]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C5A880] text-[#C5A880]" />
              ))}
            </div>
            <span className="font-semibold text-[#2A2421]">4.9 / 5.0</span>
            <span className="hidden sm:inline">·</span>
            <span className="bg-[#EFE7DC] px-2 py-0.5 text-[11px] text-[#7A6C63]">
              Curated Atelier Client Reviews (Sample Collector Testimonials)
            </span>
          </div>
        </div>

        {/* 3 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#F5EFEB] border border-[#E7DFD4] p-8 flex flex-col justify-between hover-luxury-lift hover:border-[#C5A880] hover:shadow-xl hover:shadow-[#C5A880]/15 will-change-transform"
            >
              <div>
                <Quote className="w-8 h-8 text-[#C5A880]/50 mb-4" />
                
                {/* Rating */}
                <div className="flex items-center gap-1 text-[#C5A880] mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C5A880]" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#4A3F38] font-light leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Piece */}
              <div className="mt-8 pt-6 border-t border-[#E5DDD0]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-base font-semibold text-[#2A2421]">
                      {rev.author}
                    </h3>
                    <p className="text-[11px] text-[#8C7B70]">{rev.location}</p>
                  </div>
                  {rev.verified && (
                    <div className="flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 font-medium">
                      <CheckCircle className="w-3 h-3 text-emerald-700" />
                      <span>Verified Buyer</span>
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-[#8C6D46] mt-2 font-medium">
                  Acquired: {rev.productName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
