import React from 'react';
import { Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../../data/perfumeCatalog';
import { useTheme } from '../../context/ThemeContext';

export const CustomerReviewsSection: React.FC = () => {
  const { isLight } = useTheme();

  return (
    <section
      id="reviews"
      className={`scroll-mt-24 py-20 sm:py-28 transition-colors duration-300 border-b ${
        isLight 
          ? 'bg-[#FAF7F2] border-[#9A742A]/20' 
          : 'bg-[#171515] border-[#C2A064]/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] uppercase tracking-[0.25em] font-sans ${
            isLight
              ? 'border-[#9A742A]/40 bg-[#FFFFFF] text-[#591D2D] shadow-sm'
              : 'border-[#C2A064]/40 bg-[#421C27]/40 text-[#DFC48E]'
          }`}>
            <Sparkles className={`w-3.5 h-3.5 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
            <span>Patron Testimonials</span>
          </div>
          <h2 className={`font-serif text-3xl sm:text-5xl font-normal tracking-tight transition-colors ${
            isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'
          }`}>
            Words of Devotion
          </h2>
          <p className={`text-sm sm:text-base font-sans transition-colors ${
            isLight ? 'text-[#5C5456]' : 'text-[#A89F93]'
          }`}>
            Reflections from connoisseurs and patrons who have found their defining signature scent with VELMORA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className={`p-6 sm:p-8 rounded-xl border flex flex-col justify-between space-y-6 relative group transition-all duration-300 ${
                isLight 
                  ? 'bg-[#FFFFFF] border-[#E5D9C5] shadow-[0_6px_25px_rgba(154,116,42,0.08)] hover:border-[#9A742A]/60' 
                  : 'bg-[#1E1A1B] border-[#C2A064]/25 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-[#C2A064]/60'
              }`}
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        isLight ? 'fill-[#9A742A] text-[#9A742A]' : 'fill-[#C2A064] text-[#C2A064]'
                      }`} 
                    />
                  ))}
                </div>

                <h3 className={`font-serif text-lg sm:text-xl leading-snug transition-colors ${
                  isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'
                }`}>
                  "{rev.title}"
                </h3>

                <p className={`text-xs sm:text-sm font-sans leading-relaxed transition-colors ${
                  isLight ? 'text-[#5C5456]' : 'text-[#A89F93]'
                }`}>
                  {rev.text}
                </p>
              </div>

              <div className={`pt-4 border-t ${isLight ? 'border-[#E5D9C5]' : 'border-[#C2A064]/15'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-sans font-semibold text-xs sm:text-sm ${
                      isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'
                    }`}>
                      {rev.author}
                    </h4>
                    <p className={`text-[11px] font-sans ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
                      {rev.location}
                    </p>
                  </div>
                  <span className={`text-[11px] font-sans block ${
                    isLight ? 'text-[#9A742A] font-medium' : 'text-[#DFC48E]'
                  }`}>
                    {rev.product}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-sans mt-2">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
