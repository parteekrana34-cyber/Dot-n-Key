import React from 'react';
import { Sun, ArrowRight } from 'lucide-react';
import { MOST_LOVED_SUNSCREENS_CHART } from '../../data/sunscreenCatalog';
import { SunscreenProduct } from '../../types/sunscreen';

interface MostLovedComparisonChartProps {
  products: SunscreenProduct[];
  onSelectProduct: (product: SunscreenProduct) => void;
}

export const MostLovedComparisonChart: React.FC<MostLovedComparisonChartProps> = ({
  products,
  onSelectProduct,
}) => {
  return (
    <section className="py-12 sm:py-16 bg-[#FCEEF2] border-b border-[#F5D5DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Header matching Pastel Pink Korean Skincare aesthetic */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <p className="font-hand text-3xl sm:text-4xl text-[#FF8C9A] font-bold tracking-wide -rotate-1">
            Most Loved
          </p>
          <h2 className="text-2xl sm:text-4xl font-black text-[#633D4B] tracking-tight mt-0.5 flex items-center justify-center gap-2 font-display">
            <span>SPF 50+ Sunscreens</span>
            <Sun className="w-6 h-6 text-[#FF8C9A] fill-[#FF8C9A] inline animate-spin-slow" />
          </h2>
          <p className="text-xs sm:text-sm text-[#8E6B78] mt-2 leading-relaxed">
            Pick your exact skin type match: broad-spectrum UVA &amp; UVB shields crafted for daily wear with zero white cast.
          </p>
        </div>

        {/* 4 Cards Grid - Pure White Cards against Soft Blush Background */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {MOST_LOVED_SUNSCREENS_CHART.map((item) => {
            const fullProduct = products.find((p) => p.id === item.productId);

            return (
              <div
                key={item.id}
                onClick={() => fullProduct && onSelectProduct(fullProduct)}
                className="group relative flex flex-col rounded-3xl bg-white border border-[#F5D5DE] hover:border-[#FF8C9A] p-3.5 sm:p-4 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Round Category Pill Tag at top */}
                <div
                  className="w-full py-2.5 px-3 rounded-2xl bg-[#FCEEF2] text-[#633D4B] border border-[#F5D5DE] text-center font-black text-[10px] sm:text-xs tracking-wider shadow-xs uppercase leading-tight min-h-[44px] flex items-center justify-center group-hover:bg-[#FF8C9A] group-hover:text-white transition-colors"
                >
                  <span>{item.name}</span>
                </div>

                {/* Skin Type Tag */}
                <div className="text-center mt-2.5 mb-2">
                  <span
                    className="inline-block px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-[#F9DDE5] text-[#633D4B] border border-[#F5D5DE]"
                  >
                    {item.skinType}
                  </span>
                </div>

                {/* Product Tube Image */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#FCEEF2] my-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Floating SPF Badge */}
                  <span className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-white/95 text-[#633D4B] shadow-xs border border-[#F5D5DE]">
                    {item.spf}
                  </span>
                </div>

                {/* Highlight line & Action */}
                <div className="mt-2 text-center pt-2.5 border-t border-[#F5D5DE]">
                  <p className="text-xs font-bold text-[#633D4B] group-hover:text-[#FF8C9A] transition-colors truncate">
                    {item.highlight}
                  </p>
                  <div className="mt-1.5 text-[11px] font-bold text-[#FF8C9A] flex items-center justify-center gap-1 opacity-90 group-hover:opacity-100">
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
