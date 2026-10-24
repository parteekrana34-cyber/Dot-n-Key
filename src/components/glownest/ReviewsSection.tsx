import React from 'react';
import { Star, CheckCircle2, Heart, Sparkles, MessageSquare } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../../data/skincareCatalog';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#FAF7F5] border-b border-[#F0E6E1]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFE5EC] text-[#E11D48] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Real Results, Real Glow</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1E1B1D] tracking-tight">
            Loved By Over 45,000+ Indian Skincare Enthusiasts
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex text-[#F59E0B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />
              ))}
            </div>
            <span className="text-xs font-bold text-[#1E1B1D]">4.9 / 5.0 Overall Rating</span>
            <span className="text-xs text-[#7A6E75]">(from 12,400+ verified customer reviews)</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CUSTOMER_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-5 rounded-3xl bg-white border border-[#EFE5E0] hover:border-[#FFD1DC] shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: User avatar, name, verification */}
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-10 h-10 rounded-full object-cover border border-[#FFD1DC]"
                  />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#1E1B1D] flex items-center gap-1">
                      {review.author}
                      {review.verified && (
                        <span title="Verified Buyer">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                        </span>
                      )}
                    </h4>
                    <p className="text-[10px] text-[#8C828A]">{review.skinType} • {review.date}</p>
                  </div>
                </div>

                {/* Star rating */}
                <div className="flex items-center gap-1 text-[#F59E0B] mb-2">
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-[#F59E0B]" />
                  ))}
                </div>

                {/* Review Headline & Comment */}
                <h5 className="font-extrabold text-xs sm:text-sm text-[#1E1B1D] mb-1.5 leading-snug">
                  "{review.reviewTitle}"
                </h5>
                <p className="text-xs text-[#52474E] leading-relaxed">
                  {review.comment}
                </p>
              </div>

              {/* Tagged product footer */}
              <div className="mt-4 pt-3 border-t border-[#F5EFEA] flex items-center justify-between text-[11px] text-[#7A6E75]">
                <span className="font-bold text-[#E11D48] truncate">
                  Product: {review.productName}
                </span>
                <span className="text-[10px] bg-[#FAF7F5] px-2 py-0.5 rounded-md font-semibold shrink-0">
                  {review.productTag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
